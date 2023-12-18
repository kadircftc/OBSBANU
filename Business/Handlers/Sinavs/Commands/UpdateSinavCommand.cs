﻿
using Business.Constants;
using Business.BusinessAspects;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Core.Aspects.Autofac.Validation;
using Business.Handlers.Sinavs.ValidationRules;


namespace Business.Handlers.Sinavs.Commands
{


    public class UpdateSinavCommand : IRequest<IResult>
    {
        public int Id { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public System.DateTime DeletedDate { get; set; }
        public int DersAcmaId { get; set; }
        public int SınavTuruId { get; set; }
        public int DerslikId { get; set; }
        public int OgrElmID { get; set; }
        public int EtkiOrani { get; set; }
        public System.DateTime SinavTarihi { get; set; }

        public class UpdateSinavCommandHandler : IRequestHandler<UpdateSinavCommand, IResult>
        {
            private readonly ISinavRepository _sinavRepository;
            private readonly IMediator _mediator;

            public UpdateSinavCommandHandler(ISinavRepository sinavRepository, IMediator mediator)
            {
                _sinavRepository = sinavRepository;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(UpdateSinavValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(UpdateSinavCommand request, CancellationToken cancellationToken)
            {
                var isThereSinavRecord = await _sinavRepository.GetAsync(u => u.Id == request.Id);


                isThereSinavRecord.CreatedDate = request.CreatedDate;
                isThereSinavRecord.UpdatedDate = request.UpdatedDate;
                isThereSinavRecord.DeletedDate = request.DeletedDate;
                isThereSinavRecord.DersAcmaId = request.DersAcmaId;
                isThereSinavRecord.SınavTuruId = request.SınavTuruId;
                isThereSinavRecord.DerslikId = request.DerslikId;
                isThereSinavRecord.OgrElmID = request.OgrElmID;
                isThereSinavRecord.EtkiOrani = request.EtkiOrani;
                isThereSinavRecord.SinavTarihi = request.SinavTarihi;


                _sinavRepository.Update(isThereSinavRecord);
                await _sinavRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Updated);
            }
        }
    }
}

