using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MuseumApp.Data.Context;
using MuseumApp.Data.Entities;

namespace MuseumApp.Repositories
{
    public interface IAuditoriumsRepository : IRepository<AuditoriumEntity>
    {

    }
    public class AuditoriumsRepository : IAuditoriumsRepository
    {
        private readonly MuseumContext _museumContext;

        public AuditoriumsRepository(MuseumContext museumContext)
        {
            _museumContext = museumContext;
        }

        public AuditoriumEntity Delete(object id)
        {
            AuditoriumEntity entity = _museumContext.Auditoriums.Find(id);
            if (entity == null) return null;
            var result = _museumContext.Auditoriums.Remove(entity);
            _museumContext.SaveChanges();
            return result.Entity;

        }

        public async Task<IEnumerable<AuditoriumEntity>> GetAll()
        {
            var data = await _museumContext.Auditoriums.ToListAsync();
            return data;
        }

        public async Task<AuditoriumEntity> GetByIdAsync(object id)
        {
            var data = await _museumContext.Auditoriums.FindAsync(id);
            return data;
        }

        public AuditoriumEntity Insert(AuditoriumEntity obj)
        {
            foreach (var item in _museumContext.Auditoriums)
            {
                if (obj.AuditoriumId == item.AuditoriumId)
                {
                    return null;
                };
            }

            var data = _museumContext.Auditoriums.Add(obj).Entity;
            _museumContext.SaveChanges();
            return data;
        }

        public void Save()
        {
            _museumContext.SaveChanges();
        }

        public AuditoriumEntity Update(AuditoriumEntity obj)
        {
            var updatedEntry = _museumContext.Auditoriums.Attach(obj).Entity;
            _museumContext.Entry(obj).State = EntityState.Modified;
            return updatedEntry;
        }
    }
}