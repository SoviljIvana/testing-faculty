using MuseumApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MuseumApp.Domain.Interfaces
{
    public interface IAuditoriumService
    {

        Task<IEnumerable<AuditoriumDomainModel>> GetAllAuditoriums();

        Task<AuditoriumDomainModel> GetAuditoriumByIdAsync(int id);

        Task<AuditoriumResultModel> CreateAuditorium(AuditoriumDomainModel createAuditorium);

        Task<AuditoriumResultModel> DeleteAuditoriumAsync(int id);

        Task<AuditoriumResultModel> UpdateAuditorium(AuditoriumDomainModel createAuditorium);

        Task<List<int[]>> testForDeletionAsync(int id);
    }
}