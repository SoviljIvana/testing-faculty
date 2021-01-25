
using MuseumApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MuseumApp.Domain.Interfaces
{
    public interface IMuseumService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<MuseumDomainModel>> GetAllMuseums();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<MuseumDomainModel> GetMuseumByIdAsync(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>

        MuseumResaultModel CreateMuseum(MuseumDomainModel museumModel);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<MuseumResaultModel> DeleteMuseum(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Task<MuseumResaultModel> UpdateMuseum(MuseumDomainModel update);
    }
}