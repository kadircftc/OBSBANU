using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class OgrenciTranskriptDto
    {
        public List<OgrenciTranskriptDersler> Dersler { get; set; } = new List<OgrenciTranskriptDersler>();
        public float Ano { get; set; }
        public int DönemlikKredi { get; set; }
        public float ECTS { get; set; }
        public float GenelKredi { get; set; }
        public float GenelEcts { get; set; }
    }
}
