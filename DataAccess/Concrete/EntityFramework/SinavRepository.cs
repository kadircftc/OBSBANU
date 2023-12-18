
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class SinavRepository : EfEntityRepositoryBase<Sinav, ProjectDbContext>, ISinavRepository
    {
        public SinavRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
