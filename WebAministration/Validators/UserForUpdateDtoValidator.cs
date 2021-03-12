using FluentValidation;
using FluentValidation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAdministration.Dtos;

namespace WebAdministration.Validators
{
    public class UserForUpdateDtoValidator:AbstractValidator<UserForUpdateDto>
    {
        public UserForUpdateDtoValidator()
        {
            RuleFor(u => u.Name)
                .NotEmpty().WithMessage("name is required")
                .Length(6, 100).WithMessage("name lenght should be in between 6-100 characters");
            RuleFor(u => u.PhoneNumber)
                .NotEmpty().WithMessage("phone number is required")
                .Must(BeAValidNumber).WithMessage("phone number is not valid");
            RuleFor(u => u.City)
                .NotEmpty().WithMessage("city is required");
            RuleFor(u => u.Country)
                .NotEmpty().WithMessage("country is required");
            
        }

        protected bool BeAValidNumber(string phonenumber)
        {
            return true;

        }
    }
}
