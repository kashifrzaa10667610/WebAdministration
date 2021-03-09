using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAdministration.Dtos
{
    public class UserCreteDto
    {
        public UserCreteDto()
        {
            this.Password = "password";
            this.Created = DateTime.Now;
        }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string? Password { get; set; }
        public DateTime? Created { get; set; }
    }
}
