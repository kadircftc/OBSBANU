using Business.BusinessAspects;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Performance;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.Ogrencis.Queries
{
    public class GetOgrenciDersKayitDersleriListQuery:IRequest<IDataResult<IEnumerable<OgrenciDersKayitDersleri>>>
    {
        public int UserId { get; set; }

        public class GetOgrenciDersKayitDersleriListQueryHandler : IRequestHandler<GetOgrenciDersKayitDersleriListQuery, IDataResult<IEnumerable<OgrenciDersKayitDersleri>>>
        {
            private readonly IOgrenciRepository _ogrenciRepository;
            private readonly IMediator _mediator;

            public GetOgrenciDersKayitDersleriListQueryHandler(IOgrenciRepository ogrenciRepository, IMediator mediator)
            {
                _ogrenciRepository = ogrenciRepository;
                _mediator = mediator;
            }

            [PerformanceAspect(5)]
            [CacheAspect(10)]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]

         

            public async Task<IDataResult<IEnumerable<OgrenciDersKayitDersleri>>> Handle(GetOgrenciDersKayitDersleriListQuery request, CancellationToken cancellationToken)
            {
                return new SuccessDataResult<IEnumerable<OgrenciDersKayitDersleri>>(_ogrenciRepository.GetOgrenciDersKayitDersleriList(request.UserId));
            }
        }
    }
}
