
using System;
using System.Linq;
using System.Threading.Tasks;
using Core.DataAccess;
using Entities.Concrete;
using Entities.Dtos;

namespace DataAccess.Abstract
{
    public interface IOgrenciRepository : IEntityRepository<Ogrenci>
    {
        Task<IQueryable<OzlukBilgileriDto>> GetOzlukBilgileriAsync(int userId);
    }
}