using System;
using System.Collections.Generic;
using System.Text;

namespace MuseumApp.Domain.Models
{
    public class MuseumResaultModel
    {
        public bool IsSuccessful { get; set; }

        public string ErrorMessage { get; set; }

        public MuseumDomainModel Museum { get; set; }
    }
}