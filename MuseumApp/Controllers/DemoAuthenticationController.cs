using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MuseumApp.ServiceExtensions;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuseumApp.Controllers
{
    [OpenApiIgnore]
    public class DemoAuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DemoAuthenticationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("/get-token")]
        public IActionResult GenerateToken(string name = "aspnetcore-workshop-demo", bool guest = false, bool admin = false)
        {
            var jwt = JwtTokenGenerator
                .Generate(name, guest, admin, _configuration["Tokens:Issuer"], _configuration["Tokens:Key"]);

            return Ok(new { token = jwt });
        }
    }
}
