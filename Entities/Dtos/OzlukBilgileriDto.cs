using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class OzlukBilgileriDto:IDto
    {
        public string Adi { get; set; }
        public string Soyadi { get; set; }
        public string TcKimlikNo { get; set; }
        public DateTime DogumTarihi { get; set; }
        public string BolumAdi { get; set; }
        public string OgrNo { get; set; }
        public DateTime KayitTarihi { get; set; }
        public string Durum { get; set; }
        public DateTime AyrilmaTarihi { get; set; }
        public string DanismanAdi { get; set; }
        public string DanismanSoyadi { get; set; }
        public string Adres { get; set; }
        public string TelefonNo { get; set; }
    }
}
