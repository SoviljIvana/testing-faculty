using Microsoft.EntityFrameworkCore;
using MuseumApp.Data.Context;
using MuseumApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MuseumApp.Repositories
{

    public interface IExhibitsRepository : IRepository<ExhibitEntity>
    {
        Task<IEnumerable<ExhibitEntity>> GetAllExhibitsForSpecificExhibitions(int id);

    }
    public class ExhibitsRepository : IExhibitsRepository
    {
        private readonly MuseumContext _museumContext;

        public ExhibitsRepository(MuseumContext museumContext)
        {
            _museumContext = museumContext;
        }
        public ExhibitEntity Delete(object id)
        {

            ExhibitEntity entity = _museumContext.Exhibits.Find(id);
            if (entity == null) return null;
            var result = _museumContext.Exhibits.Remove(entity);
            _museumContext.SaveChanges();
            return result.Entity;
        }

        public async Task<IEnumerable<ExhibitEntity>> GetAll()
        {
            var data = await _museumContext.Exhibits.ToListAsync();
            if (data.Count == 0)
            {
                return null;
            }
            return data;
        }

        public async Task<IEnumerable<ExhibitEntity>> GetAllExhibitsForSpecificExhibitions(int id)
        {
            var data = await _museumContext.Exhibits.ToListAsync();
            var list = new List<ExhibitEntity>();
            foreach (var item in data)
            {
                if (item.ExhibitionId == id)
                {
                    list.Add(item);
                }
            }
            if (list.Count == 0)
            {
                list = null;
            }
            return list;
        }

        public async Task<ExhibitEntity> GetByIdAsync(object id)
        {
            var data = await _museumContext.Exhibits.FindAsync(id);
            return data;
        }

        public ExhibitEntity Insert(ExhibitEntity obj)
        {
            foreach (var item in _museumContext.Exhibits)
            {
                if (obj.ExhibitId == item.ExhibitId)
                {
                    return null;
                };
            }

            var data = _museumContext.Exhibits.Add(obj).Entity;
            _museumContext.SaveChanges();
            return data;
        }


        public void Save()
        {
            _museumContext.SaveChanges();
        }

        public ExhibitEntity Update(ExhibitEntity obj)
        {
            var updatedEntry = _museumContext.Exhibits.Attach(obj).Entity;
            _museumContext.Entry(obj).State = EntityState.Modified;
            return updatedEntry;
        }
    }
}
