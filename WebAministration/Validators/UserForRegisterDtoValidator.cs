using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAdministration.Dtos;

namespace WebAdministration.Validators
{
    public class UserForRegisterDtoValidator:AbstractValidator<UserForRegisterDto>
    {
        public UserForRegisterDtoValidator()
        {
            RuleFor(r => r.Username)
                .NotEmpty().WithMessage("username is required")
                .Matches("^[a-zA-Z0-9 ]*$").WithMessage("user is not satisfied");
            RuleFor(r=>r.Email)
                .NotEmpty().WithMessage("email is required")
                .EmailAddress().WithMessage("A valid email is required");
            RuleFor(r => r.Password)
                .NotEmpty().WithMessage("password is required");
            RuleFor(r => r.Gender)
                .NotEmpty().WithMessage("gender is required");
            RuleFor(r => r.DateOfBirth)
                .NotEmpty().WithMessage("dateofbirth cannot be empty")
                .LessThan(p => DateTime.Now).WithMessage("not a valid date");



        }
    }
}
