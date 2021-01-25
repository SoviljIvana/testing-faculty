
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MuseumApp.Models;
using MuseumApp.Domain.Common;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace MuseumApp.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ExhibitionsController : ControllerBase
    {
        private readonly IExhibitionService _exhibitionService;

        public ExhibitionsController(IExhibitionService exhibitionService)
        {
            _exhibitionService = exhibitionService;
        }

        [Route("get")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExhibitionDomainModel>>> GetAllExhibitions()
        {
            IEnumerable<ExhibitionDomainModel> exhibitionDomainModel;
            exhibitionDomainModel = await _exhibitionService.GetAllExhibitions();
            if (exhibitionDomainModel == null)
            {
                return NotFound(Messages.EXHIBITIONS_GET_ALL_ERROR);
            }
            return Ok(exhibitionDomainModel);

        }

        [Route("get/comingSoon")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExhibitionDomainModel>>> GetAllExhibitionsInTheFuture()
        {
            IEnumerable<ExhibitionDomainModel> exhibitionDomainModel;
            exhibitionDomainModel = await _exhibitionService.GetAllExhibitionsInTheFuture();
            if (exhibitionDomainModel == null)
            {
                return NotFound(Messages.EXHIBITIONS_GET_ALL_ERROR);
            }
            return Ok(exhibitionDomainModel);
        }

        [Route("get/currentExhibitions")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExhibitionDomainModel>>> GetCurrentExhibitions()
       
        {
            IEnumerable<ExhibitionDomainModel> exhibitionDomainModel;
            try
            {
                exhibitionDomainModel = await _exhibitionService.GetCurrentExhibitions();
            }
            catch (DbUpdateException e)
            {
                ErrorResponseModel errorResponse = new ErrorResponseModel
                {
                    ErrorMessage = e.InnerException.Message ?? e.Message,
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };
                return BadRequest(errorResponse);

            }

            if (exhibitionDomainModel == null)
            {
                ErrorResponseModel errorResponse = new ErrorResponseModel()
                {
                    ErrorMessage = Messages.EXHIBITION_DOES_NOT_EXIST,
                    StatusCode = System.Net.HttpStatusCode.NotFound
                };
                return NotFound(errorResponse);
            }
            return Ok(exhibitionDomainModel);
        }

        [Route("get/{id}")]
        [HttpGet]
        public async Task<ActionResult<ExhibitionDomainModel>> GetExhibitionById(int id)
        {
            ExhibitionDomainModel exhibitionDomainModel = await _exhibitionService.GetExhibitionByIdAsync(id);

            if (exhibitionDomainModel == null)
            {
                return NotFound(Messages.EXHIBITION_GET_ID_ERROR + id);
            }

            return Ok(exhibitionDomainModel);
        }


        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteExhibition(int id)
        {
            ExhibitionResultModel exhibitionResult = await _exhibitionService.DeleteExhibition(id);
            if (!exhibitionResult.IsSuccessful)
            {
                return BadRequest(exhibitionResult.ErrorMessage + id);
            }

            return Ok(exhibitionResult.Exhibition);
        }

        [Route("post/")]
        [HttpPost]
        public async Task<ActionResult> PostExhibition([FromBody] CreateExhibitionModel createExhibition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ExhibitionDomainModel exhibitionDomainModel = new ExhibitionDomainModel
            {
                ExhibitionId = createExhibition.ExhibitionId,
                ExhibitionName = createExhibition.ExhibitionName,
                AuditoriumId = createExhibition.AuditoriumId,
                TypeOfExhibition = createExhibition.TypeOfExhibition,
                StartTime = createExhibition.StartTime,
                EndTime = createExhibition.EndTime

            };

            var create = await _exhibitionService.CreateExhibition(exhibitionDomainModel);

            if (!create.IsSuccessful) return BadRequest(create);

            return Ok(create);

        }

        [Route("{id}")]
        [HttpPut]
        public async Task<ActionResult> PutExhibition(int id, [FromBody] UpdateExhibitionModel updateExhibition)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exhibitionUpdate = await _exhibitionService.GetExhibitionByIdAsync(id);

            if (exhibitionUpdate == null)
            {
                return NotFound(Messages.EXHIBITION_DOES_NOT_EXIST);
            }

            if (updateExhibition.StartTime < DateTime.Now || updateExhibition.EndTime < DateTime.Now || updateExhibition.EndTime < updateExhibition.StartTime)
            {
                return BadRequest(Messages.EXHIBITION_IN_THE_FUTURE);

            }
            else
            {
                exhibitionUpdate.ExhibitionName = updateExhibition.ExhibitionName;
                exhibitionUpdate.TypeOfExhibition = updateExhibition.TypeOfExhibition;
                exhibitionUpdate.StartTime = updateExhibition.StartTime;
                exhibitionUpdate.EndTime = updateExhibition.EndTime;
            }

            var update = await _exhibitionService.UpdateExhibition(exhibitionUpdate);

            if (!update.IsSuccessful) return BadRequest(update);

            return Ok(update);
        }


    }
}
