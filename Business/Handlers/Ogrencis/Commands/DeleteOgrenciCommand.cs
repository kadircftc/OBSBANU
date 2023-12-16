
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Business.BusinessAspects;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace Business.Handlers.Ogrencis.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class DeleteOgrenciCommand : IRequest<IResult>
    {
        public int Id { get; set; }

        public class DeleteOgrenciCommandHandler : IRequestHandler<DeleteOgrenciCommand, IResult>
        {
            private readonly IOgrenciRepository _ogrenciRepository;
            private readonly IMediator _mediator;

            public DeleteOgrenciCommandHandler(IOgrenciRepository ogrenciRepository, IMediator mediator)
            {
                _ogrenciRepository = ogrenciRepository;
                _mediator = mediator;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(DeleteOgrenciCommand request, CancellationToken cancellationToken)
            {
                var ogrenciToDelete = _ogrenciRepository.Get(p => p.Id == request.Id);

                _ogrenciRepository.Delete(ogrenciToDelete);
                await _ogrenciRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Deleted);
            }
        }
    }
}

