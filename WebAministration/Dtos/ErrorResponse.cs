using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAdministration.Models.ErrorModel;

namespace WebAdministration.Dtos
{
    public class ErrorResponse
    {
        public List<Error> Errors { get; set; } = new List<Error>();
    }
}
