
using MuseumApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MuseumApp.Domain.Interfaces
{
    public interface IExhibitionService
    {


        Task<IEnumerable<ExhibitionDomainModel>> GetAllExhibitions();
        Task<IEnumerable<ExhibitionDomainModel>> GetAllExhibitionsInTheFuture();
        Task<IEnumerable<ExhibitionDomainModel>> GetCurrentExhibitions();
        Task<ExhibitionDomainModel> GetExhibitionByIdAsync(int id);
        Task<ExhibitionResultModel> CreateExhibition(ExhibitionDomainModel exhibitionModel);
        Task<ExhibitionResultModel> DeleteExhibition(int id);
        Task<ExhibitionResultModel> UpdateExhibition(ExhibitionDomainModel exhibitionModel);


    }
}