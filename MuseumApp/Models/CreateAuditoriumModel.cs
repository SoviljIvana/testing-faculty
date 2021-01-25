using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuseumApp.Models
{
    public class CreateAuditoriumModel
    {
        public int AuditoriumId { get; set; }
        public int MuseumId { get; set; }
        public string NameOfAuditorium { get; set; }
        public int NumberOfSeats { get; set; }
    }
}