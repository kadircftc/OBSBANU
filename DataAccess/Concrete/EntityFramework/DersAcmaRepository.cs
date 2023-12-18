
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class DersAcmaRepository : EfEntityRepositoryBase<DersAcma, ProjectDbContext>, IDersAcmaRepository
    {
        public DersAcmaRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
