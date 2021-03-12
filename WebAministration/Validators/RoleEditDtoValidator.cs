using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAdministration.Dtos;

namespace WebAdministration.Validators
{
    public class RoleEditDtoValidator : AbstractValidator<RoleEditDto>
    {
        public RoleEditDtoValidator()
        {
            RuleFor(r => r.RoleNames)
                 .NotEmpty().WithMessage("roles are required");

        }
    }
}
