
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class BolumRepository : EfEntityRepositoryBase<Bolum, ProjectDbContext>, IBolumRepository
    {
        public BolumRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
