﻿using WebAdministration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAdministration.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public ICollection<string> userRoles { get; set; }
        
    }
}
