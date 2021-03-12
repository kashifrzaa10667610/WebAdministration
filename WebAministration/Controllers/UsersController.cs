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
using WebAdministration.Models.ErrorModel;

namespace WebAdministration.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repo,
            IMapper mapper, 
            RoleManager<Role> roleManager,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _mapper = mapper;
            _repo = repo;
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager=signInManager;
        }

        [Authorize]
        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;
            if ((id == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                || (User.IsInRole("Admin"))||(User.IsInRole("HelpDesk")))
            {
                var user = await _repo.GetUser(id, isCurrentUser);
                var userToReturn = _mapper.Map<UserForDetailedDto>(user);
                return Ok(userToReturn);
            }
            return Unauthorized(new Error
            {
                Message = "Failed..! You are not allowed",
            });    
        }

        [Authorize("Require-Member-Admin-HelpDesk-Role")]
        [HttpGet("userById/{id}")]
        public async Task<IActionResult> UserById(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;
            if ((id == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                || (User.IsInRole("Admin"))||(User.IsInRole("HelpDesk")))
            {
                var user = await _repo.GetUser(id, isCurrentUser);
                var userToReturn = _mapper.Map<UserForDetailedDto>(user);
                return Ok(userToReturn);
            }
            return Unauthorized(new Error
            {
                Message = "Failed..! You are not allowed",
            });
        }

        [Authorize("Require-Admin-Member-Role")]
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
            return Unauthorized(new Error
            {
                Message = "Failed..! You are not allowed",
            });
                
        }
        // [Authorize]
        // [HttpPost("logout")]
        // public async Task<IActionResult> Logout()
        // {
            
        //     await _signInManager.SignOutAsync();
        //     return Ok("user successfully logged out");
        // }    
    }
}