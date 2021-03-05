using System.Threading.Tasks;
using WebAdministration.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebAdministration.Dtos;
using Microsoft.AspNetCore.Identity;
using WebAdministration.Models;
using System;
using AutoMapper;
using WebAdministration.Helpers;
using System.Security.Claims;
using System.Collections.Generic;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {

        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;
        private readonly IUserRepository _repo;

        public AdminController(
            RoleManager<Role> roleManager,
            UserManager<User> userManager,

            IMapper mapper,
            IUserRepository repo)
            
        {
            _userManager = userManager;
            _roleManager = roleManager;

            _mapper = mapper;
            _repo = repo;

            
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("userswithRole")]
        public async Task<IActionResult> GetUsersWithRole([FromQuery] UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            userParams.UserId = currentUserId;

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to remove the roles");
            var userToReturn=_mapper.Map<UserForDetailedDto>(user);
            var userrole=await _userManager.GetRolesAsync(user);
            userToReturn.userRoles=userrole;
            return Ok(userToReturn);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("createRole")]
        public async Task<IActionResult> CreateRole( RoleCreateDto roleCreateDto)
        {
            var roles = _roleManager.Roles.ToList();
            var newRole = roleCreateDto.RoleName;
            foreach (var availrole in roles)
            {
                if(string.Equals(availrole.Name,newRole))
                {
                   return BadRequest("Failed 'Role exitst");
                }
                
            }
           // var rles=_roleManager.Roles.ToList();
           // var item =await _userManager.GetUsersInRoleAsync();
            await _roleManager.CreateAsync(new Role { Name = newRole });
            return Ok(_mapper.Map<IEnumerable<RoleListDto>>(_roleManager.Roles.ToList()));

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("deleteRole")]
        public async Task<IActionResult> DeleteRole(RoleDeleteDto roleDeleteDto)
        {
            var role = await _roleManager.FindByNameAsync(roleDeleteDto.RoleName);
            if (role==null) 
            {
                return BadRequest("Role deos not exist");
            }
            await _roleManager.DeleteAsync(role);
            return Ok(_mapper.Map<IEnumerable<RoleListDto>>(_roleManager.Roles.ToList()));

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("lockunlock/{userName}")]
        public async Task<IActionResult> LockUnlock(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            
            if (user == null)
                return NotFound();
          

            if( user.LockoutEnd!=null && user.LockoutEnd>DateTime.Now)
            {
                user.LockoutEnd = DateTime.Now;
                await _userManager.UpdateAsync(user);
               

                return Ok(user);
            }
            else
            {
                user.LockoutEnd=DateTime.Now.AddYears(1000);
                await _userManager.UpdateAsync(user);
                return Ok(user);
            }

        }
    }
}