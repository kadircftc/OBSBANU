
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
using System.Threading.Tasks;
using System.Collections.Generic;
using Core.Entities.Concrete;

namespace DataAccess.Concrete.EntityFramework
{
    public class DersAlmaRepository : EfEntityRepositoryBase<DersAlma, ProjectDbContext>, IDersAlmaRepository
    {
        
        public DersAlmaRepository(ProjectDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<DersAlma>> BulkInsert(int userId, IEnumerable<DersAlma> dersAcmaIds)
        {
        
            await Context.DersAlma.AddRangeAsync(dersAcmaIds);
            return dersAcmaIds;
        }
    }
}
