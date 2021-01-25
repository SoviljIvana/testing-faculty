
using MuseumApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MuseumApp.Domain.Interfaces
{
    public interface IExhibitService
    {

        Task<IEnumerable<ExhibitDomainModel>> GetAllExhibits();
        Task<ExhibitDomainModel> GetExhibitByIdAsync(int id);

        Task<IEnumerable<ExhibitDomainModel>> GetAllExhibitsForSpecificExhibitions(int id);

        Task<ExhibitResultModel> CreateExhibit(ExhibitDomainModel exhibitModel);

        Task<ExhibitResultModel> DeleteExhibit(int id);

        Task<ExhibitResultModel> UpdateExhibit(ExhibitDomainModel exhibitModel);
    }
}