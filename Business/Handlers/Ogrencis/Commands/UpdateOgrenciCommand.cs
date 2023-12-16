
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
using Business.Handlers.Ogrencis.ValidationRules;


namespace Business.Handlers.Ogrencis.Commands
{


    public class UpdateOgrenciCommand : IRequest<IResult>
    {
        public int Id { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public System.DateTime DeletedDate { get; set; }
        public int BolumId { get; set; }
        public string OgrenciNo { get; set; }
        public int DurumId { get; set; }
        public System.DateTime AyrilmaTarihi { get; set; }
        public string Adi { get; set; }
        public string Soyadi { get; set; }
        public string TcKimlikNo { get; set; }
        public int CinsiyetId { get; set; }
        public string DogumTarihi { get; set; }
        public int UserId { get; set; }

        public class UpdateOgrenciCommandHandler : IRequestHandler<UpdateOgrenciCommand, IResult>
        {
            private readonly IOgrenciRepository _ogrenciRepository;
            private readonly IMediator _mediator;

            public UpdateOgrenciCommandHandler(IOgrenciRepository ogrenciRepository, IMediator mediator)
            {
                _ogrenciRepository = ogrenciRepository;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(UpdateOgrenciValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(UpdateOgrenciCommand request, CancellationToken cancellationToken)
            {
                var isThereOgrenciRecord = await _ogrenciRepository.GetAsync(u => u.Id == request.Id);


                isThereOgrenciRecord.CreatedDate = request.CreatedDate;
                isThereOgrenciRecord.UpdatedDate = request.UpdatedDate;
                isThereOgrenciRecord.DeletedDate = request.DeletedDate;
                isThereOgrenciRecord.BolumId = request.BolumId;
                isThereOgrenciRecord.OgrenciNo = request.OgrenciNo;
                isThereOgrenciRecord.DurumId = request.DurumId;
                isThereOgrenciRecord.AyrilmaTarihi = request.AyrilmaTarihi;
                isThereOgrenciRecord.Adi = request.Adi;
                isThereOgrenciRecord.Soyadi = request.Soyadi;
                isThereOgrenciRecord.TcKimlikNo = request.TcKimlikNo;
                isThereOgrenciRecord.CinsiyetId = request.CinsiyetId;
                isThereOgrenciRecord.DogumTarihi = request.DogumTarihi;
                isThereOgrenciRecord.UserId = request.UserId;


                _ogrenciRepository.Update(isThereOgrenciRecord);
                await _ogrenciRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Updated);
            }
        }
    }
}

