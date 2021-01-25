using System;
using System.Collections.Generic;
using System.Text;

namespace MuseumApp.Domain.Models
{
    public class ExhibitDomainModel
    {
        public int ExhibitId { get; set; }
        public int ExhibitionId { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public string PicturePath { get; set; }
        public int AuditoriumId { get; set; }
    }
}