
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuseumApp.Domain.Common;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;
using MuseumApp.Models;

namespace MuseumApp.Controllers
{
   
    [ApiController]
    [Route("api/[controller]")]
    public class AuditoriumsController : ControllerBase
    {

        private readonly IAuditoriumService _auditoriumService;

        public AuditoriumsController(IAuditoriumService auditoriumService)
        {
            _auditoriumService = auditoriumService;
        }

        [Route("get")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuditoriumDomainModel>>> GetAllAuditoriums()
        {
            IEnumerable<AuditoriumDomainModel> auditoriumDomainModel;
            auditoriumDomainModel = await _auditoriumService.GetAllAuditoriums();

            if (auditoriumDomainModel == null)
            {
                return NotFound(Messages.AUDITORIUM_GET_ALL_ERROR);
            }
            return Ok(auditoriumDomainModel);
        }

        [Route("get/{id}")]
        [HttpGet]
        public async Task<ActionResult<AuditoriumDomainModel>> GetAuditoriumById(int id)
        {
            AuditoriumDomainModel auditoriumDomainModel = await _auditoriumService.GetAuditoriumByIdAsync(id);

            if (auditoriumDomainModel == null)
            {
                return NotFound(Messages.AUDITORIUM_GET_ID_ERROR + id);
            }

            return Ok(auditoriumDomainModel);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteAuditoriumAsync(int id)
        {
            AuditoriumResultModel auditoriumResult = await _auditoriumService.DeleteAuditoriumAsync(id);
            if (!auditoriumResult.IsSuccessful)
            {
                return BadRequest(auditoriumResult.ErrorMessage + id);
            }

            return Ok(auditoriumResult.Auditorium);
        }

        [Route("post/")]
        [HttpPost]
        public async Task<ActionResult<AuditoriumDomainModel>> PostAuditorium(CreateAuditoriumModel createAuditorium)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AuditoriumDomainModel auditoriumDomainModel = new AuditoriumDomainModel
            {
                AuditoriumId = createAuditorium.AuditoriumId,
                NameOfAuditorium = createAuditorium.NameOfAuditorium,
                MuseumId = createAuditorium.MuseumId,
                NumberOfSeats = createAuditorium.NumberOfSeats

            };

            var create = await _auditoriumService.CreateAuditorium(auditoriumDomainModel);

            if (!create.IsSuccessful) return BadRequest(create);

            return Ok(create);
        }

        [Route("put/{id}")]
        [HttpPut]
        public async Task<ActionResult> PutAuditorium(int id, [FromBody] UpdateAuditoriumModel updateAuditorium)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var auditoriumUpdate = await _auditoriumService.GetAuditoriumByIdAsync(id);
            if (auditoriumUpdate == null)
            {
                return NotFound(Messages.AUDITORIUM_DOES_NOT_EXIST);
            }

            auditoriumUpdate.NameOfAuditorium = updateAuditorium.NameOfAuditorium;
            auditoriumUpdate.NumberOfSeats = updateAuditorium.NumberOfSeats;

            var update = await _auditoriumService.UpdateAuditorium(auditoriumUpdate);

            if (!update.IsSuccessful) return BadRequest(update);

            return Ok(update);
        }

    }
}
