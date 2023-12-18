using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Sinav : BaseEntityModel, IEntity
    {
        public int DersAcmaId { get; set; }
        public int SınavTuruId { get; set; }
        public int DerslikId { get; set; }
        public int OgrElmID { get; set; }
        public int EtkiOrani { get; set; }
        public DateOnly SinavTarihi { get; set; }
        public TimeOnly SinavSaati { get; set; }
    }
}
