using System;
using System.Collections.Generic;
using System.Text;
using MuseumApp.Domain.Common;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;
using System.Threading.Tasks;
using MuseumApp.Repositories;
using MuseumApp.Data.Entities;

namespace MuseumApp.Domain.Services
{
    public class ExhibitionService : IExhibitionService
    {
        private readonly IExhibitionsRepository _exhibitionRepository;
        private readonly IAuditoriumsRepository _auditoriumRepository;
        private readonly IExhibitsRepository _exhibitsRepository;
        public ExhibitionService(IExhibitionsRepository exhibitionRepository, IAuditoriumsRepository auditoriumsRepository, IExhibitsRepository exhibitsRepository)
        {
            _exhibitionRepository = exhibitionRepository;
            _auditoriumRepository = auditoriumsRepository;
            _exhibitsRepository = exhibitsRepository;
        }

        public async Task<ExhibitionResultModel> CreateExhibition(ExhibitionDomainModel exhibitionModel)
        {
            ExhibitionEntity newExhibition = new ExhibitionEntity
            {
                ExhibitionId = exhibitionModel.ExhibitionId,
                ExhibitionName = exhibitionModel.ExhibitionName,
                AuditoriumId = exhibitionModel.AuditoriumId,
                TypeOfExhibition = exhibitionModel.TypeOfExhibition,
                StartTime = exhibitionModel.StartTime,
                EndTime = exhibitionModel.EndTime
            };
            bool auditorium = false;
            var listOfAuditoriums = await _auditoriumRepository.GetAll();
            foreach (var item in listOfAuditoriums)
            {
                if (item.AuditoriumId == exhibitionModel.AuditoriumId)
                {
                    auditorium = true;
                };
            }
            if (auditorium == false)
            {
                return new ExhibitionResultModel
                {
                    IsSuccessful = false,
                    ErrorMessage = Messages.AUDITORIUM_WITH_THIS_ID_DOES_NOT_EXIST,
                    Exhibition = null
                };

            }
            if (exhibitionModel.StartTime < DateTime.Now || exhibitionModel.EndTime < DateTime.Now || exhibitionModel.EndTime < exhibitionModel.StartTime)
            {
                return new ExhibitionResultModel
                {
                    IsSuccessful = false,
                    ErrorMessage = Messages.START_MUST_BE_IN_THE_FUTURE,
                    Exhibition = null
                };

            }
            var exhibition = _exhibitionRepository.Insert(newExhibition);

            if (exhibition == null)
            {
                return new ExhibitionResultModel
                {
                    IsSuccessful = false,
                    ErrorMessage = Messages.EXHIBITION_WITH_THIS_ID_ALREADY_EXISTS,
                    Exhibition = null
                };
            }

            ExhibitionResultModel result = new ExhibitionResultModel
            {
                IsSuccessful = true,
                ErrorMessage = null,
                Exhibition = new ExhibitionDomainModel
                {
                    ExhibitionId = exhibition.ExhibitionId,
                    ExhibitionName = exhibition.ExhibitionName,
                    AuditoriumId = exhibition.AuditoriumId,
                    TypeOfExhibition = exhibition.TypeOfExhibition,
                    StartTime = exhibition.StartTime,
                    EndTime = exhibition.EndTime
                }
            };

            return result;
        }

        public async Task<ExhibitionResultModel> DeleteExhibition(int id)
        {
            var listOfExhibitions = await _exhibitionRepository.GetAll();

            if (listOfExhibitions == null)
            {
                return new ExhibitionResultModel
                {
                    ErrorMessage = Messages.EXHIBITIONS_LIST_IS_EMPTY,
                    IsSuccessful = false,
                    Exhibition = null
                };
            }
            else
            {
                
                   
                var existing = await _exhibitionRepository.GetByIdAsync(id);

                if (existing == null)
                {
                    return new ExhibitionResultModel
                    {
                        ErrorMessage = Messages.EXHIBITION_DOES_NOT_EXIST,
                        IsSuccessful = false,
                        Exhibition = null

                    };
                }

                //exhibition in the future
                if (existing.StartTime > DateTime.Now)
                {
                    return new ExhibitionResultModel
                    {
                        ErrorMessage = Messages.EXHIBITION_IN_THE_FUTURE,
                        IsSuccessful = false,
                        Exhibition = null

                    };
                }

                //The exhibition began but wasn't finished
                if ((existing.EndTime == DateTime.Now) || (existing.EndTime > DateTime.Now))
                {
                    return new ExhibitionResultModel
                    {
                        ErrorMessage = Messages.EXHIBITION_IS_NOT_OVER,
                        IsSuccessful = false,
                        Exhibition = null

                    };
                }
                var deletedExhibition = _exhibitionRepository.Delete(id);
                ExhibitionResultModel result = new ExhibitionResultModel
                {
                    ErrorMessage = null,
                    IsSuccessful = true,
                    Exhibition = new ExhibitionDomainModel
                    {
                        ExhibitionId = deletedExhibition.ExhibitionId,
                        ExhibitionName = deletedExhibition.ExhibitionName,
                        AuditoriumId = deletedExhibition.AuditoriumId,
                        TypeOfExhibition = deletedExhibition.TypeOfExhibition,
                        StartTime = deletedExhibition.StartTime,
                        EndTime = deletedExhibition.EndTime
                    }
                };
                return result;
            }
        }

        public async Task<IEnumerable<ExhibitionDomainModel>> GetAllExhibitions()
        {
            var data = await _exhibitionRepository.GetAll();

            if (data == null)
            {
                return null;
            }
            List<ExhibitionDomainModel> list = new List<ExhibitionDomainModel>();

            ExhibitionDomainModel exhibitionModel;
            foreach (var item in data)
            {
                exhibitionModel = new ExhibitionDomainModel
                {
                    ExhibitionId = item.ExhibitionId,
                    ExhibitionName = item.ExhibitionName,
                    AuditoriumId = item.AuditoriumId,
                    TypeOfExhibition = item.TypeOfExhibition,
                    StartTime = item.StartTime,
                    EndTime = item.EndTime,
                    About = item.About,
                    Picture = item.Picture
                };
                list.Add(exhibitionModel);
            }
            return list;
        }


        public async Task<IEnumerable<ExhibitionDomainModel>> GetAllExhibitionsInTheFuture()
        {
            var data = await _exhibitionRepository.GetAll();

            if (data == null)
            {
                return null;
            }

            List<ExhibitionDomainModel> list = new List<ExhibitionDomainModel>();

            ExhibitionDomainModel exhibitionModel;
            foreach (var item in data)
            {
                exhibitionModel = new ExhibitionDomainModel
                {
                    ExhibitionId = item.ExhibitionId,
                    ExhibitionName = item.ExhibitionName,
                    AuditoriumId = item.AuditoriumId,
                    TypeOfExhibition = item.TypeOfExhibition,
                    StartTime = item.StartTime,
                    EndTime = item.EndTime,
                    Picture = item.Picture
                };
                if (item.StartTime > DateTime.Now)
                {
                    list.Add(exhibitionModel);
                }
            }
            return list;
        }


        public async Task<IEnumerable<ExhibitionDomainModel>> GetCurrentExhibitions()
        {
            var data = await _exhibitionRepository.GetAll();

            if (data == null)
            {
                return null;
            }

            List<ExhibitionDomainModel> list = new List<ExhibitionDomainModel>();

            ExhibitionDomainModel exhibitionModel;
            foreach (var item in data)
            {
                exhibitionModel = new ExhibitionDomainModel
                {
                    ExhibitionId = item.ExhibitionId,
                    ExhibitionName = item.ExhibitionName,
                    AuditoriumId = item.AuditoriumId,
                    TypeOfExhibition = item.TypeOfExhibition,
                    StartTime = item.StartTime,
                    About = item.About,
                    EndTime = item.EndTime,
                    Picture = item.Picture
                };
                if ((item.StartTime < DateTime.Now) && (item.EndTime > DateTime.Now))
                {
                    list.Add(exhibitionModel);
                }
            }
            return list;
        }

        public async Task<ExhibitionDomainModel> GetExhibitionByIdAsync(int id)
        {
           var data = await _exhibitionRepository.GetByIdAsync(id);

            if (data == null) return null;

            ExhibitionDomainModel result;

            var exhibits = await _exhibitsRepository.GetAllExhibitsForSpecificExhibitions(id);

            var exhibitsList = new List<ExhibitDomainModel>();

            if (exhibits == null)
            {
                result = new ExhibitionDomainModel
                {
                    ExhibitionId = data.ExhibitionId,
                    ExhibitionName = data.ExhibitionName,
                    AuditoriumId = data.AuditoriumId,
                    TypeOfExhibition = data.TypeOfExhibition,
                    StartTime = data.StartTime,
                    EndTime = data.EndTime,
                    Picture = data.Picture,
                    Description = data.Description,
                    Exhibits = null
                };
                return result;
            }
            else
            {
                foreach (var exhibit in exhibits)
                {
                    exhibitsList.Add(new ExhibitDomainModel
                    {
                        Name = exhibit.ExhibitName,
                        PicturePath = exhibit.PicturePath,
                        Year = exhibit.Year,
                        AuditoriumId = exhibit.AuditoriumId,
                        ExhibitId = exhibit.ExhibitId,
                        ExhibitionId = exhibit.ExhibitionId
                    });
                }
                result = new ExhibitionDomainModel
                {
                    ExhibitionId = data.ExhibitionId,
                    ExhibitionName = data.ExhibitionName,
                    AuditoriumId = data.AuditoriumId,
                    TypeOfExhibition = data.TypeOfExhibition,
                    StartTime = data.StartTime,
                    EndTime = data.EndTime,
                    Picture = data.Picture,
                    Description = data.Description,
                    Exhibits = exhibitsList
                };

            }
            return result;
        }

        public async Task<ExhibitionResultModel> UpdateExhibition(ExhibitionDomainModel updateExhibition)
        {
            var data = await _exhibitionRepository.GetByIdAsync(updateExhibition.ExhibitionId);

            ExhibitionEntity exhibition = new ExhibitionEntity
            {
                ExhibitionId = updateExhibition.ExhibitionId,
                AuditoriumId = updateExhibition.AuditoriumId,
                ExhibitionName = updateExhibition.ExhibitionName,
                TypeOfExhibition = updateExhibition.TypeOfExhibition,
                StartTime = updateExhibition.StartTime,
                EndTime = updateExhibition.EndTime
            };


            var exhibitionUpdate = _exhibitionRepository.Update(exhibition);

            if (exhibitionUpdate == null)
            {
                return new ExhibitionResultModel
                {
                    IsSuccessful = false,
                    ErrorMessage = Messages.EXHIBITION_UPDATE_ERROR,
                    Exhibition = null
                };
            }

            _exhibitionRepository.Save();


            ExhibitionResultModel result = new ExhibitionResultModel
            {
                IsSuccessful = true,
                ErrorMessage = null,
                Exhibition = new ExhibitionDomainModel
                {
                    ExhibitionId = exhibitionUpdate.ExhibitionId,
                    AuditoriumId = exhibitionUpdate.AuditoriumId,
                    ExhibitionName = exhibitionUpdate.ExhibitionName,
                    TypeOfExhibition = exhibitionUpdate.TypeOfExhibition,
                    StartTime = exhibitionUpdate.StartTime,
                    EndTime = exhibitionUpdate.EndTime,

                }
            };
            return result;

        }


    }
}