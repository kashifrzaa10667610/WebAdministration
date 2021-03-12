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
using WebAdministration.Models.ErrorModel;

namespace WebAdministration.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {

        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;
        private readonly IUserRepository _repo;
        private readonly DataContext _context;

        public AdminController(
            DataContext context,
            RoleManager<Role> roleManager,
            UserManager<User> userManager,

            IMapper mapper,
            IUserRepository repo)

        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;

            _mapper = mapper;
            _repo = repo;


        }


        [Authorize(Policy = "Require-Admin-HelpDesk-Role")]
        [HttpGet("getRoles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            var listob = new List<RoleListDto>();
            foreach (Role r in roles)
            {
                listob.Add(new RoleListDto
                {
                    Id = r.Id,
                    Name = r.Name
                });
            }
            return Ok(listob);
        }

        [Authorize(Policy = "Require-Admin-HelpDesk-Role")]
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
            if(user==null || user.Name=="Admin")
            {
                return BadRequest(new Error
                {
                    Message = "Failed..! user does not exit or you cannot edit role of admin"
                });
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest(result.Errors);
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            var userrole = await _userManager.GetRolesAsync(user);
            userToReturn.userRoles = userrole;
            return Ok(userToReturn);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("createRole")]
        public async Task<IActionResult> CreateRole(RoleCreateDto roleCreateDto)
        {
            var roles = _roleManager.Roles.ToList();
            var newRole = roleCreateDto.RoleName;
            foreach (var availrole in roles)
            {
                if (string.Equals(availrole.Name, newRole))
                {
                    return BadRequest(new Error
                    {
                        Message = "Failed..! Role Exist",
                    });
                }

            }
            // var rles=_roleManager.Roles.ToList();
            // var item =await _userManager.GetUsersInRoleAsync();
            await _roleManager.CreateAsync(new Role { Name = newRole });
            return Ok(_mapper.Map<IEnumerable<RoleListDto>>(_roleManager.Roles.ToList()));

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("deleteRole/{roleName}")]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return NotFound(new Error
                {
                    Message = "Failed..! role does not exist",
                });
            }
            var result = await _roleManager.DeleteAsync(role);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok(_mapper.Map<IEnumerable<RoleListDto>>(_roleManager.Roles.ToList()));

        }

        [Authorize(Policy = "Require-Admin-HelpDesk-Role")]
        [HttpPost("lockunlock/{userName}")]
        public async Task<IActionResult> LockUnlock(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null || user.UserName == "Admin")
                return BadRequest(new Error
                {
                    Message = "Failed..! user does not exist|| you cannot delete admin user",
                });


            if (user.LockoutEnd != null && user.LockoutEnd > DateTime.Now)
            {
                user.LockoutEnd = null;

                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }


                return Ok(user);
            }
            else
            {
                user.LockoutEnd = DateTime.Now.AddYears(1000);
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
                return Ok(user);
            }

        }
        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("createuser")]
        public async Task<IActionResult> CreateUser(UserCreteDto userCreateDto)
        {

            var userToCreate = _mapper.Map<User>(userCreateDto);
            var userindb = await _userManager.FindByNameAsync(userToCreate.UserName);
            if (userindb != null)
            {
                return BadRequest(new Error
                {
                    Message = "Failed..! user already exist",
                });
            }
            var result = await _userManager.CreateAsync(userToCreate, userCreateDto.Password);
            var userToReturn = _mapper.Map<UserForDetailedDto>(userToCreate);
            if (result.Succeeded)
            {
                //assign role to newly registered user and make changes to return object
                var user = await _userManager.FindByNameAsync(userToReturn.Username);
                _userManager.AddToRoleAsync(user, "Member").Wait();
                var userRoles = await _userManager.GetRolesAsync(user);
                userToReturn.userRoles = userRoles;


                return CreatedAtRoute(routeName: "GetUser",
                    routeValues: new { controller = "Users", id = userToCreate.Id },
                    value: userToReturn);
            }

            return BadRequest(result.Errors);

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("deleteUser/{userName}")]
        public async Task<IActionResult> DeleteUser(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null || user.UserName == "Admin")
            {
                return BadRequest(new Error
                {
                    Message = "Failed..! user does not exist or you cannot delete admin user",
                });

            }
            IdentityResult result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new Error
                {
                    Message = "Failed..! user is not deledted"
                });

            }
            return Ok(userName + " account deleted ");

        }
    }
}