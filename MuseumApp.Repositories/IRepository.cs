using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MuseumApp.Repositories
{
    public interface IRepository<T> where T : class
    {
        void Save();
        Task<IEnumerable<T>> GetAll();

        Task<T> GetByIdAsync(object id);
        T Delete(object id);
        T Insert(T obj);
        T Update(T obj);

    }
}