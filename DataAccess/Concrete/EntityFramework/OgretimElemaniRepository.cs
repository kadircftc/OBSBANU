
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class OgretimElemaniRepository : EfEntityRepositoryBase<OgretimElemani, ProjectDbContext>, IOgretimElemaniRepository
    {
        public OgretimElemaniRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
