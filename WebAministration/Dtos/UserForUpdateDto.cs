using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAdministration.Dtos
{
    public class UserForUpdateDto
    {
        public string Name{get;set;}
        public string PhoneNumber {get; set;}
        public string City { get; set; }
        public string Country { get; set; }
        public string Introduction{get;set;}
    }
}
