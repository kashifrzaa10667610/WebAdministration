using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAdministration.Dtos;

namespace WebAdministration.Validators
{
    public class RoleCreateDtoValidator:AbstractValidator<RoleCreateDto>
    {
        public RoleCreateDtoValidator()
        {
            RuleFor(r => r.RoleName)
                .NotEmpty().WithMessage("rolename is required");

        }
    }
}
