using System;
using System.Collections.Generic;
using System.Text;
using MuseumApp.Data.Context;
using System.Threading.Tasks;
using MuseumApp.Data;
using Microsoft.EntityFrameworkCore;

namespace MuseumApp.Repositories

{
    public interface IMuseumsRepository : IRepository<MuseumEntity>
    {

    }
    public class MuseumsRepository : IMuseumsRepository
    {
        private readonly MuseumContext _museumContext;

        public MuseumsRepository(MuseumContext museumContext)
        {
            _museumContext = museumContext;
        }

        public MuseumEntity Delete(object id)
        {
            MuseumEntity entity = _museumContext.Museums.Find(id);
            if (entity == null) return null;
            var result = _museumContext.Museums.Remove(entity);
            _museumContext.SaveChanges();
            return result.Entity;

        }

        public async Task<IEnumerable<MuseumEntity>> GetAll()
        {
            var data = await _museumContext.Museums.ToListAsync();
            return data;
        }

        public async Task<MuseumEntity> GetByIdAsync(object id)
        {
            var data = await _museumContext.Museums.FindAsync(id);
            return data;
        }

        public MuseumEntity Insert(MuseumEntity obj)
        {
            foreach (var item in _museumContext.Museums)
            {
                if (obj.MuseumId == item.MuseumId)
                {
                    return null;
                };
            }

            var data = _museumContext.Museums.Add(obj).Entity;
            _museumContext.SaveChanges();
            return data;
        }

        public void Save()
        {
            _museumContext.SaveChanges();
        }

        public MuseumEntity Update(MuseumEntity obj)
        {
            var updatedEntry = _museumContext.Museums.Attach(obj).Entity;
            _museumContext.Entry(obj).State = EntityState.Modified;
            return updatedEntry;
        }


    }
}