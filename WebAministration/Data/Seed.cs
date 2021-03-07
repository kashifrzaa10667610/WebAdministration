using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using WebAdministration.Models;
using Newtonsoft.Json;

namespace WebAdministration.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/userseed.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "Member"},
                    new Role{Name = "Admin"},
                    new Role{Name="HelpDesk"},                   
                    new Role{Name = "Account"},
                    new Role{Name = "VIP"},
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, roles[0].Name).Wait();
                }

                List<User> adminHelpDesk=new List<User>();
                
                adminHelpDesk.Add( 
                    new User
                    {
                       UserName = "Admin",
                       Email="admin@gmail.com"
                    }
                );
                adminHelpDesk.Add(
                    new User
                    {
                       UserName="HelpDesk",
                       Email="helpdesk@gmail.com"
                    }
                );
             
                foreach(User user in adminHelpDesk)
                {
                    if (userManager.CreateAsync(user, "password").Result.Succeeded)
                    {
                        var role = userManager.FindByNameAsync(user.UserName).Result;
                        userManager.AddToRolesAsync(role, new[] { user.UserName,"Member" }).Wait();
                    }
                }
                
            }
        }
    }
}
