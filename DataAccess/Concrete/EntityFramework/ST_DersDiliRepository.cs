﻿
using System;
using System.Linq;
using Core.DataAccess.EntityFramework;
using Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Abstract;
namespace DataAccess.Concrete.EntityFramework
{
    public class ST_DersDiliRepository : EfEntityRepositoryBase<ST_DersDili, ProjectDbContext>, IST_DersDiliRepository
    {
        public ST_DersDiliRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
