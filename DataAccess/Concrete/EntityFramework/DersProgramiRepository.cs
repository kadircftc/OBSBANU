
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class DersProgramiRepository : EfEntityRepositoryBase<DersProgrami, ProjectDbContext>, IDersProgramiRepository
    {
        public DersProgramiRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
