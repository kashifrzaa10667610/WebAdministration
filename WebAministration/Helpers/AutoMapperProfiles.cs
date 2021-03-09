using AutoMapper;
using WebAdministration.Models;
using WebAdministration.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAdministration.Helpers
{
    public class AutoMapperProfiles :Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                })
                .ForMember(dest=>dest.userRoles,opt=>
                {
                    opt.MapFrom(src => src.UserRoles.Select(r=>r.Role.Name));
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                })
                 .ForMember(dest => dest.userRoles, opt =>
                 {
                     opt.MapFrom(src => src.UserRoles.Select(r => r.Role.Name));
                 });

 
            CreateMap<UserForUpdateDto, User>();
          
            CreateMap<UserForRegisterDto, User>();
            CreateMap<Role, RoleListDto>();
            CreateMap<UserCreteDto, User>();


        }
    }
}
