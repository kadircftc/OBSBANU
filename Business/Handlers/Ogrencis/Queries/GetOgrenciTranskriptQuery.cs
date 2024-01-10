using Amazon.Runtime.Internal;
using Business.BusinessAspects;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Performance;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
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
    public class GetOgrenciTranskriptQuery:IRequest<IDataResult<IEnumerable<OgrenciTranskriptDto>>>
    {
        public int Id { get; set; }

        public class GetOgrenciTranskriptQueryHandler : IRequestHandler<GetOgrenciTranskriptQuery, IDataResult<IEnumerable<OgrenciTranskriptDto>>>
        {
            private readonly IOgrenciRepository _ogrenciRepository;
            private readonly IMediator _mediator;

            public GetOgrenciTranskriptQueryHandler(IOgrenciRepository ogrenciRepository, IMediator mediator)
            {
                _ogrenciRepository = ogrenciRepository;
                _mediator = mediator;
            }

            [PerformanceAspect(5)]
            [CacheAspect(10)]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<OgrenciTranskriptDto>>> Handle(GetOgrenciTranskriptQuery request, CancellationToken cancellationToken)
            {
                List<OgrenciTranskriptDersler> dersler = _ogrenciRepository.GetOgrenciTranskriptAsync(request.Id);
          
                float toplamKredi = 0;

                foreach (var ders in dersler)
                {
                    toplamKredi += ders.Kredi;
                }
                OgrenciTranskriptDto transkriptDersler = new OgrenciTranskriptDto
                {
                    Dersler = dersler,
                    GenelKredi = toplamKredi
                    
                };

               
                List<OgrenciTranskriptDto> transkriptListesi = new List<OgrenciTranskriptDto> { transkriptDersler };

                return new SuccessDataResult<IEnumerable<OgrenciTranskriptDto>>(transkriptListesi);



                
            }
        }
    }
}
