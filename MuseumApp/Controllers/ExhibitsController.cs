
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MuseumApp.Models;
using MuseumApp.Domain.Common;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;

namespace MuseumApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExhibitsController : ControllerBase
    {
        private readonly IExhibitService _exhibitService;

        public ExhibitsController(IExhibitService exhibitService)
        {
            _exhibitService = exhibitService;
        }


        [Route("get")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExhibitDomainModel>>> GetAllExhibits()
        {
            IEnumerable<ExhibitDomainModel> exhibitDomainModel = await _exhibitService.GetAllExhibits();

            if (exhibitDomainModel == null)
            {
                return NotFound(Messages.EXHIBITS_GET_ALL_ERROR);

            }
            return Ok(exhibitDomainModel);

        }

        [Route("getForSpecificId/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExhibitDomainModel>>> GetAllExhibitsForSpecificExhibition(int id)
        {
            IEnumerable<ExhibitDomainModel> exhibitDomainModel = await _exhibitService.GetAllExhibitsForSpecificExhibitions(id);

            if (exhibitDomainModel == null)
            {
                return NotFound(Messages.EXHIBITS_GET_ALL_ERROR);

            }
            return Ok(exhibitDomainModel);

        }

        [Route("get/{id}")]
        [HttpGet]
        public async Task<ActionResult<ExhibitDomainModel>> GetExhibitById(int id)
        {
            ExhibitDomainModel exhibitDomainModel = await _exhibitService.GetExhibitByIdAsync(id);

            if (exhibitDomainModel == null)
            {
                return NotFound(Messages.EXHIBIT_GET_ID_ERROR + id);
            }

            return Ok(exhibitDomainModel);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult<ExhibitResultModel>> DeleteExhibit(int id)
        {
            ExhibitResultModel exhibitResult = await _exhibitService.DeleteExhibit(id);
            if (!exhibitResult.IsSuccessful)
            {
                return BadRequest(exhibitResult.ErrorMessage + id);
            }

            return Ok(exhibitResult.Exhibit);

        }

        [Route("post/")]
        [HttpPost]
        public async Task<ActionResult> PostExhibit([FromBody] CreateExhibitModel createExhibit)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ExhibitDomainModel exhibitDomain = new ExhibitDomainModel
            {
                ExhibitId = createExhibit.ExhibitId,
                ExhibitionId = createExhibit.ExhibitionId,
                Name = createExhibit.Name,
                Year = createExhibit.Year,
                PicturePath = createExhibit.PicturePath,
                AuditoriumId = createExhibit.AuditoriumId

            };

            var create = await _exhibitService.CreateExhibit(exhibitDomain);

            if (!create.IsSuccessful) return BadRequest(create);

            return Ok(create);


        }

        [Route("put/{id}")]
        [HttpPut]
        public async Task<ActionResult> PutExhibit(int id, [FromBody] UpdateExhibitModel updateExhibit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exhibitUpdate = await _exhibitService.GetExhibitByIdAsync(id);


            if (exhibitUpdate == null)
            {
                return NotFound(Messages.EXHIBIT_DOES_NOT_EXIST);
            }


            exhibitUpdate.Name = updateExhibit.Name;
            exhibitUpdate.PicturePath = updateExhibit.PicturePath;
            exhibitUpdate.Year = updateExhibit.Year;


            var update = await _exhibitService.UpdateExhibit(exhibitUpdate);

            if (!update.IsSuccessful) return BadRequest(update);

            return Ok(update);
        }
    }
}