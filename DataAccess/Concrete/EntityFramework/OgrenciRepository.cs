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
using System.Collections.Generic;

namespace DataAccess.Concrete.EntityFramework
{
    public class OgrenciRepository : EfEntityRepositoryBase<Ogrenci, ProjectDbContext>, IOgrenciRepository
    {
        private readonly ProjectDbContext _context;

        public OgrenciRepository(ProjectDbContext context) : base(context)
        {
            _context = context;
        }

        public List<OgrenciDto> GetOgrenciDto()
        {
            var result = from ogr in _context.Ogrenci
                         join bolum in _context.Bolum
                         on ogr.BolumId equals bolum.Id
                         join ogrDurum in _context.ST_OgrenciDurum
                         on ogr.DurumId equals ogrDurum.Id
                         join user in _context.Users
                         on ogr.UserId equals user.UserId
                         select new OgrenciDto
                         {
                             Id = ogr.Id,
                             BolumAdi = bolum.BolumAdi,
                             OgrenciNo = ogr.OgrenciNo,
                             Durum = ogrDurum.Ad,
                             AyrilmaTarihi=ogr.AyrilmaTarihi,
                             Adi=ogr.Adi,
                             Soyadi=ogr.Soyadi,
                             TcKimlikNo=ogr.TcKimlikNo,
                             Cinsiyet=ogr.Cinsiyet ? "Kadın" : "Erkek",
                             DogumTarihi=ogr.DogumTarihi.ToString(),
                             Mail=user.Email,
                             TelefonNo=user.MobilePhones,
                             Adres=user.Address,
                             CreatedDate=ogr.CreatedDate,
                             UpdatedDate=ogr.UpdatedDate,
                             DeletedDate = ogr.DeletedDate
                         };
            return result.ToList();
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
                             DogumTarihi = o.DogumTarihi.ToString(),
                             BolumAdi = b.BolumAdi,
                             OgrNo = o.OgrenciNo,
                             KayitTarihi = o.CreatedDate.ToShortDateString(),
                             Durum = durum.Ad,
                             AyrilmaTarihi = o.AyrilmaTarihi.ToShortDateString(),
                             DanismanAdi = ogr.Adi,
                             DanismanSoyadi = ogr.Soyadi,
                             Adres = u.Address,
                             TelefonNo = u.MobilePhones
                         };

            return await Task.FromResult(result.AsQueryable());
        }
    }
}
