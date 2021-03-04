using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAdministration.Data;
using WebAdministration.Dtos;
using WebAdministration.Helpers;
using WebAdministration.Models;

namespace WebAdministration.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repo, IMapper mapper, 
            RoleManager<Role> roleManager,
            UserManager<User> userManager)
        {
            _mapper = mapper;
            _repo = repo;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [Authorize]
        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;
            if ((id == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                || (User.IsInRole("Admin")))
            {
                var user = await _repo.GetUser(id, isCurrentUser);
                var userToReturn = _mapper.Map<UserForDetailedDto>(user);
                return Ok(userToReturn);
            }
            return Unauthorized();    
        }

        [Authorize]
        [HttpGet("userById/{id}")]
        public async Task<IActionResult> UserById(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;
            if ((id == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                || (User.IsInRole("Admin")))
            {
                var user = await _repo.GetUser(id, isCurrentUser);
                var userToReturn = _mapper.Map<UserForDetailedDto>(user);
                return Ok(userToReturn);
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpPut("updateuser/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if ((id == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))||
                (User.IsInRole("Admin")))
            {
                var userFromRepo = await _repo.GetUser(id, true);

                _mapper.Map(userForUpdateDto, userFromRepo);
                if (await _repo.SaveAll())
                    return NoContent();

                throw new Exception($"Updating user {id} failed on save");
            }
            return Unauthorized();
                
        }

       
    }
}