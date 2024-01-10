using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class OgrenciTranskriptDersler
    {
        public string DersKodu { get; set; }
        public string DersAdi { get; set; }
        public float Kredi { get; set; }
        public float ECTS { get; set; }
        public float Not { get; set; }
        public float? VizeNotu { get; set; }
        public float? FinalNotu { get; set; }
        public float? ButunlemeNotu { get; set; }
        public string OgrenciSinifi { get; set; }
        public string OgrenciDonemi { get; set; }
        public float? NotOrt { get; set; }
        public string SinavDonemi { get; set; }
    }
}
