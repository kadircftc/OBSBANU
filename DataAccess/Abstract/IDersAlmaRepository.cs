
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.DataAccess;
using Core.Entities.Concrete;
using Entities.Concrete;
namespace DataAccess.Abstract
{
    public interface IDersAlmaRepository : IEntityRepository<DersAlma>
    {
        Task<IEnumerable<DersAlma>> BulkInsert(int userId, IEnumerable<DersAlma> dersAcmaIds);
    }
}