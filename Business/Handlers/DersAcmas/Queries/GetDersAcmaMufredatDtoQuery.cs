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

namespace Business.Handlers.DersAcmas.Queries
{
    public class GetDersAcmaMufredatDtoQuery:IRequest<IDataResult<IEnumerable<DersAcmaMufredatDto>>>
    {
        public class GetDersAcmaMufredatDtoQueryHandler : IRequestHandler<GetDersAcmaMufredatDtoQuery, IDataResult<IEnumerable<DersAcmaMufredatDto>>>
        {
            private readonly IDersAcmaRepository _dersAcmaRepository;
            private readonly IMediator _mediator;

            public GetDersAcmaMufredatDtoQueryHandler(IDersAcmaRepository dersAcmaRepository, IMediator mediator)
            {
                _dersAcmaRepository = dersAcmaRepository;
                _mediator = mediator;
            }

            public async Task<IDataResult<IEnumerable<DersAcmaMufredatDto>>> Handle(GetDersAcmaMufredatDtoQuery request, CancellationToken cancellationToken)
            {
                return new SuccessDataResult<IEnumerable<DersAcmaMufredatDto>>(_dersAcmaRepository.GetDersMufredatList());
            }
        }
    }
}
