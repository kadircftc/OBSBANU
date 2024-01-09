using Business.BusinessAspects;
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Caching;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.DersAlmas.Commands
{
    public class UpdateDersAlmaRangeCommand : IRequest<IResult>
    {
        public int UserId { get; set; }
        public int DersDurum { get; set; }
        public int[] DersAcmaIds { get; set; }


        public class UpdateDersAlmaRangeCommandHandler : IRequestHandler<UpdateDersAlmaRangeCommand, IResult>
        {
            private readonly IDersAlmaRepository _dersAlmaRepository;
            private readonly IOgrenciRepository _ogrenciRepository;
  

            public UpdateDersAlmaRangeCommandHandler(IDersAlmaRepository dersAlmaRepository, IOgrenciRepository ogrenciRepository)
            {
                _dersAlmaRepository = dersAlmaRepository;
                _ogrenciRepository = ogrenciRepository;
              
            }

            [SecuredOperation(Priority = 1)]
            [CacheRemoveAspect()]
            [LogAspect(typeof(FileLogger))]
            public async Task<IResult> Handle(UpdateDersAlmaRangeCommand request, CancellationToken cancellationToken)
            {
                Ogrenci ogrenciId =await _ogrenciRepository.GetAsync(o=>o.UserId==request.UserId);

                var dersAcmaList = request.DersAcmaIds.Select(x => new DersAlma() { DersAcmaId = x, OgrenciId = ogrenciId.Id,DersDurumId=request.DersDurum });

                await _dersAlmaRepository.BulkInsert(request.UserId, dersAcmaList);
                await _dersAlmaRepository.SaveChangesAsync();

              

                return new SuccessResult(Messages.UpdatedRangeDersAlma);
            }
        }
    }
}
