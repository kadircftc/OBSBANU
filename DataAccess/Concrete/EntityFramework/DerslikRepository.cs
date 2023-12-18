
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class DerslikRepository : EfEntityRepositoryBase<Derslik, ProjectDbContext>, IDerslikRepository
    {
        public DerslikRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
