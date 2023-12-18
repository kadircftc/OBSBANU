
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class DersHavuzuRepository : EfEntityRepositoryBase<DersHavuzu, ProjectDbContext>, IDersHavuzuRepository
    {
        public DersHavuzuRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
