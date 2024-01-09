using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class OgrenciDersKayitDersleri:IDto
    {
        public int DersAcmaId { get; set; }
        public string DersKodu { get; set; }
        public string DersBolumu { get; set; }
        public string DersAdi { get; set; }
        public string ZorunluSecmeli { get; set; }
        public float Kredi { get; set; }
        public int ECTS { get; set; }
        public string DersVerildigiSinif { get; set; }
        public string OgrenciSinifi { get; set; }
    }
}
