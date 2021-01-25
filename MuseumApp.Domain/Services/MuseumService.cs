using System;
using System.Collections.Generic;
using System.Text;
using MuseumApp.Domain.Common;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;
using System.Threading.Tasks;
using MuseumApp.Repositories;
using MuseumApp.Data;

namespace MuseumApp.Domain.Services
{
    public class MuseumService : IMuseumService
    {
        private readonly IMuseumsRepository _museumRepository;
        private readonly IAuditoriumsRepository _auditoriumsRepository;
        private readonly IExhibitionsRepository _exhibitionsRepository;
        private readonly IAuditoriumService _auditoriumService;

        public MuseumService(IMuseumsRepository museumRepository, IAuditoriumsRepository auditoriumsRepository, IAuditoriumService auditoriumService, IExhibitionsRepository exhibitionsRepository)
        {
            _museumRepository = museumRepository;
            _auditoriumsRepository = auditoriumsRepository;
            _auditoriumService = auditoriumService;
            _exhibitionsRepository = exhibitionsRepository;
        }

        public MuseumResaultModel CreateMuseum(MuseumDomainModel museumModel)
        {
            MuseumEntity newMuseum = new MuseumEntity
            {
                MuseumId = museumModel.MuseumId,
                StreetAndNumber = museumModel.StreetAndNumber,
                City = museumModel.City,
                Email = museumModel.Email,
                MuseumName = museumModel.Name,
                PhoneNumber = museumModel.PhoneNumber
            };

            var museum = _museumRepository.Insert(newMuseum);

            if (museum == null)
            {
                return new MuseumResaultModel
                {
                    IsSuccessful = false,
                    ErrorMessage = Messages.MUSEUM_WITH_THIS_ID_ALREADY_EXISTS,
                    Museum = null
                };
            }

            MuseumResaultModel result = new MuseumResaultModel
            {
                IsSuccessful = true,
                ErrorMessage = null,
                Museum = new MuseumDomainModel
                {
                    MuseumId = museum.MuseumId,
                    StreetAndNumber = museum.StreetAndNumber,
                    City = museum.City,
                    Email = museum.Email,
                    Name = museum.MuseumName,
                    PhoneNumber = museum.PhoneNumber
                }
            };
            return result;
        }

        public async Task<MuseumResaultModel> DeleteMuseum(int id)
        {
            var auditoriums = await _auditoriumsRepository.GetAll();
            MuseumResaultModel result;
            List<int[]> entitiesToBeDeleted = new List<int[]>();

            foreach (var auditorium in auditoriums)
            {
                if (auditorium.MuseumId == id)
                {
                    List<int[]> entities = await _auditoriumService.testForDeletionAsync(auditorium.AuditoriumId);
                    if (entities == null)
                    {
                        result = new MuseumResaultModel
                        {
                            Museum = null,
                            IsSuccessful = false,
                            ErrorMessage = Messages.MUSEUM_DELETE_ERROR
                        };
                        return result;
                    }
                    else
                    {
                        entitiesToBeDeleted.AddRange(entities);
                        entitiesToBeDeleted.Add(new int[]
                        {
                            auditorium.AuditoriumId,
                            1
                        });
                    }
                }
            }

            foreach (var entity in entitiesToBeDeleted)
                switch (entity[1])
                {
                    case 1:
                        _auditoriumsRepository.Delete(entity[0]);
                        break;
                    case 3:
                        _exhibitionsRepository.Delete(entity[0]);
                        break;
                }

            var deletedMuseum = _museumRepository.Delete(id);
            if (deletedMuseum == null)
                return new MuseumResaultModel
                {
                    Museum = null,
                    IsSuccessful = false,
                    ErrorMessage = Messages.MUSEUM_NOT_FOUND_ERROR
                };

            result = new MuseumResaultModel
            {
                Museum = new MuseumDomainModel
                {
                    MuseumId = deletedMuseum.MuseumId,
                    StreetAndNumber = deletedMuseum.StreetAndNumber,
                    City = deletedMuseum.City,
                    Email = deletedMuseum.Email,
                    Name = deletedMuseum.MuseumName,
                    PhoneNumber = deletedMuseum.PhoneNumber
                },
                IsSuccessful = true,
                ErrorMessage = ""
            };
            return result;
        }

        public async Task<IEnumerable<MuseumDomainModel>> GetAllMuseums()
        {
            var data = await _museumRepository.GetAll();

            if (data == null)
            {
                return null;
            }

            List<MuseumDomainModel> result = new List<MuseumDomainModel>();
            MuseumDomainModel model;
            foreach (var item in data)
            {
                model = new MuseumDomainModel
                {
                    MuseumId = item.MuseumId,
                    Name = item.MuseumName,
                    StreetAndNumber = item.StreetAndNumber,
                    City = item.City,
                    Email = item.Email,
                    PhoneNumber = item.PhoneNumber
                };
                result.Add(model);
            }
            return result;
        }

        public async Task<MuseumDomainModel> GetMuseumByIdAsync(int id)
        {
            var data = await _museumRepository.GetByIdAsync(id);

            if (data == null) return null;

            MuseumDomainModel result;
            result = new MuseumDomainModel
            {
                MuseumId = data.MuseumId,
                Name = data.MuseumName,
                StreetAndNumber = data.StreetAndNumber,
                City = data.City,
                Email = data.Email,
                PhoneNumber = data.PhoneNumber
            };
            return result;
        }

        public async Task<MuseumResaultModel> UpdateMuseum(MuseumDomainModel update)
        {
            var data = await _museumRepository.GetByIdAsync(update.MuseumId);

            MuseumEntity museum = new MuseumEntity
            {
                MuseumId = update.MuseumId,
                StreetAndNumber = update.StreetAndNumber,
                City = update.City,
                Email = update.Email,
                MuseumName = update.Name,
                PhoneNumber = update.PhoneNumber
            };


            var updateMuseum = _museumRepository.Update(museum);

            if (updateMuseum == null)
            {
                return new MuseumResaultModel
                {
                    IsSuccessful = false,
                    ErrorMessage = Messages.MUSEUM_UPDATE_ERROR,
                    Museum = null
                };
            }

            _museumRepository.Save();


            MuseumResaultModel result = new MuseumResaultModel
            {
                IsSuccessful = true,
                ErrorMessage = null,
                Museum = new MuseumDomainModel
                {
                    MuseumId = updateMuseum.MuseumId,
                    StreetAndNumber = updateMuseum.StreetAndNumber,
                    City = updateMuseum.City,
                    Email = updateMuseum.Email,
                    Name = updateMuseum.MuseumName,
                    PhoneNumber = updateMuseum.PhoneNumber
                }
            };
            return result;
        }
    }
}