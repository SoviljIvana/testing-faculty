
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
    public class MuseumsController : ControllerBase
    {

        private readonly IMuseumService _museumService;

        public MuseumsController(IMuseumService museumService)
        {
            _museumService = museumService;
        }

        [Route("get")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MuseumDomainModel>>> GetAllMuseums()
        {
            IEnumerable<MuseumDomainModel> museumDomainModel;
            museumDomainModel = await _museumService.GetAllMuseums(); //puca

            if (museumDomainModel == null)
            {
                return NotFound(Messages.MUSEUM_GET_ALL_ERROR);
            }

            return Ok(museumDomainModel);
        }


        [Route("get/{id}")]
        [HttpGet]
        public async Task<ActionResult<MuseumDomainModel>> GetMuseumById(int id)
        {
            MuseumDomainModel museumDomainModel = await _museumService.GetMuseumByIdAsync(id);

            if (museumDomainModel == null)
            {
                return NotFound(Messages.MUSEUM_GET_ID_ERROR + id);
            }

            return Ok(museumDomainModel);
        }


        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteMuseum(int id)
        {
            MuseumResaultModel museumResault = await _museumService.DeleteMuseum(id);
            if (!museumResault.IsSuccessful)
            {
                return BadRequest(museumResault.ErrorMessage + id);
            }

            return Ok(museumResault.Museum);
        }

        [Route("post/")]
        [HttpPost]
        public ActionResult<MuseumDomainModel> PostMuseum(CreateMuseumModel createMuseum)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MuseumDomainModel museumDomainModel = new MuseumDomainModel
            {
                MuseumId = createMuseum.MuseumId,
                StreetAndNumber = createMuseum.StreetAndNumber,
                City = createMuseum.City,
                Email = createMuseum.Email,
                Name = createMuseum.Name,
                PhoneNumber = createMuseum.PhoneNumber
            };

            var create = _museumService.CreateMuseum(museumDomainModel);

            if (!create.IsSuccessful) return BadRequest(create);

            return Ok(create);
        }

        [Route("put/{id}")]
        [HttpPut]
        public async Task<ActionResult> PutMuseum(int id, [FromBody] UpdateMuseumModel updateMuseum)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var museumUpdate = await _museumService.GetMuseumByIdAsync(id);


            if (museumUpdate == null)
            {
                return NotFound(Messages.MUSEUM_DOES_NOT_EXIST);
            }

            museumUpdate.City = updateMuseum.City;
            museumUpdate.StreetAndNumber = updateMuseum.StreetAndNumber;
            museumUpdate.Email = updateMuseum.Email;
            museumUpdate.Name = updateMuseum.Name;
            museumUpdate.PhoneNumber = updateMuseum.PhoneNumber;

            var update = await _museumService.UpdateMuseum(museumUpdate);
            if (!update.IsSuccessful) return BadRequest(update);

            return Ok(update);
        }
    }
}