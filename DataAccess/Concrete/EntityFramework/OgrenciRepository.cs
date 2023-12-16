
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class OgrenciRepository : EfEntityRepositoryBase<Ogrenci, ProjectDbContext>, IOgrenciRepository
    {
        public OgrenciRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
