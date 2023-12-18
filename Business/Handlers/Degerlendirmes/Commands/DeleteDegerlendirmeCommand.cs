
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


namespace Business.Handlers.Degerlendirmes.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class DeleteDegerlendirmeCommand : IRequest<IResult>
    {
        public int Id { get; set; }

        public class DeleteDegerlendirmeCommandHandler : IRequestHandler<DeleteDegerlendirmeCommand, IResult>
        {
            private readonly IDegerlendirmeRepository _degerlendirmeRepository;
            private readonly IMediator _mediator;

            public DeleteDegerlendirmeCommandHandler(IDegerlendirmeRepository degerlendirmeRepository, IMediator mediator)
            {
                _degerlendirmeRepository = degerlendirmeRepository;
                _mediator = mediator;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(DeleteDegerlendirmeCommand request, CancellationToken cancellationToken)
            {
                var degerlendirmeToDelete = _degerlendirmeRepository.Get(p => p.Id == request.Id);

                _degerlendirmeRepository.Delete(degerlendirmeToDelete);
                await _degerlendirmeRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Deleted);
            }
        }
    }
}

