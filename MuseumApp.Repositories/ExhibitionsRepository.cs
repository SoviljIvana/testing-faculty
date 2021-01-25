using Microsoft.EntityFrameworkCore;
using MuseumApp.Data.Context;
using MuseumApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace MuseumApp.Repositories
{

    public interface IExhibitionsRepository : IRepository<ExhibitionEntity>
    {

    }
    public class ExhibitionsRepository : IExhibitionsRepository
    {
        private readonly MuseumContext _museumContext;

        public ExhibitionsRepository(MuseumContext museumContext)
        {
            _museumContext = museumContext;
        }
        public ExhibitionEntity Delete(object id)
        {
            ExhibitionEntity entity = _museumContext.Exhibitions.Find(id);
            if (entity == null) return null;
            var result = _museumContext.Exhibitions.Remove(entity);
            _museumContext.SaveChanges();
            return result.Entity;
        }

        public async Task<IEnumerable<ExhibitionEntity>> GetAll()
        {
            var data = await _museumContext.Exhibitions.ToListAsync();
            return data;
        }

        public async Task<ExhibitionEntity> GetByIdAsync(object id)
        {
            var data = await _museumContext.Exhibitions.FindAsync(id);
            return data;
        }

        public ExhibitionEntity Insert(ExhibitionEntity obj)
        {
            foreach (var item in _museumContext.Exhibitions)
            {
                if (obj.ExhibitionId == item.ExhibitionId)
                {
                    return null;
                };
            }



            var data = _museumContext.Exhibitions.Add(obj).Entity;
            _museumContext.SaveChanges();
            return data;
        }

        public void Save()
        {
            _museumContext.SaveChanges();
        }

        public ExhibitionEntity Update(ExhibitionEntity obj)
        {
            var updatedEntry = _museumContext.Exhibitions.Attach(obj).Entity;
            _museumContext.Entry(obj).State = EntityState.Modified;
            return updatedEntry;
        }
    }
}