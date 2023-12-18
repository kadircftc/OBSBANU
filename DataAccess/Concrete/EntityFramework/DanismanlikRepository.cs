
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class DanismanlikRepository : EfEntityRepositoryBase<Danismanlik, ProjectDbContext>, IDanismanlikRepository
    {
        public DanismanlikRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
