using MuseumApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MuseumApp.Domain
{
    public class CreateExhibitionResultModel
    {
        public ExhibitionDomainModel Exhibition { get; set; }

        public bool IsSuccessfull { get; set; }
        public string ErrorMessage { get; set; }
    }
}
