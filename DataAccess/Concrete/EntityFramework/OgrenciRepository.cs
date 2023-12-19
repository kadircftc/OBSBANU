using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
using Entities.Dtos;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Entities;

namespace DataAccess.Concrete.EntityFramework
{
    public class OgrenciRepository : EfEntityRepositoryBase<Ogrenci, ProjectDbContext>, IOgrenciRepository
    {
        private readonly ProjectDbContext _context;

        public OgrenciRepository(ProjectDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IQueryable<OzlukBilgileriDto>> GetOzlukBilgileriAsync(int userId)
        {
            var result = from u in _context.Users
                         join o in _context.Ogrenci
                         on u.UserId equals o.UserId
                         join durum in _context.ST_OgrenciDurum
                         on o.DurumId equals durum.Id
                         join b in _context.Bolum
                         on o.BolumId equals b.Id
                         join d in _context.Danismanlik
                         on o.Id equals d.OgrenciId
                         join ogr in _context.OgretimElemani
                         on d.OgrElmID equals ogr.Id
                         where u.UserId == userId
                         select new OzlukBilgileriDto
                         {
                             Adi = o.Adi,
                             Soyadi = o.Soyadi,
                             TcKimlikNo = o.TcKimlikNo,
                             DogumTarihi = o.DogumTarihi,
                             BolumAdi = b.BolumAdi,
                             OgrNo = o.OgrenciNo,
                             KayitTarihi = o.CreatedDate,
                             Durum = durum.Ad,
                             AyrilmaTarihi = o.AyrilmaTarihi,
                             DanismanAdi = ogr.Adi,
                             DanismanSoyadi = ogr.Soyadi,
                             Adres = u.Address,
                             TelefonNo = u.MobilePhones
                         };

            return await Task.FromResult(result.AsQueryable());
        }
    }
}
