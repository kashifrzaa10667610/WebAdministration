using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAdministration.Dtos;

namespace WebAdministration.Validators
{
    public class UserForLoginDtoValidator:AbstractValidator<UserForLoginDto>
    {
        public UserForLoginDtoValidator()
        {
            RuleFor(l => l.Username)
                .NotEmpty().WithMessage("username is required");
            RuleFor(l => l.Password)
                .NotEmpty().WithMessage("password is required");
        }
    }
}
