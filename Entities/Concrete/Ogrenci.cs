using Core.Entities;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Ogrenci:BaseEntityModel,IEntity
    {
        public int BolumId { get; set; }
        public string OgrenciNo { get; set; }
        public int DurumId { get; set; }
        public DateOnly AyrilmaTarihi { get; set; }
        public string Adi { get; set; }
        public string Soyadi { get; set; }
        public string TcKimlikNo { get; set; }
        public bool Cinsiyet { get; set; }
        public DateOnly DogumTarihi { get; set; }
        public int UserId { get; set; }
       
    }
}
