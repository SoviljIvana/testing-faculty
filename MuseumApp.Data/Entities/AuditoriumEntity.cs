using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MuseumApp.Data.Entities
{
    [Table("auditorium")]
    public class AuditoriumEntity
    {
        [Key]
        public int AuditoriumId { get; set; }
        public int MuseumId { get; set; }
        public string AuditoriumName { get; set; }
        public int NumberOfSeats { get; set; }
        public virtual MuseumEntity Museum { get; set; }
        public virtual ICollection<ExhibitionEntity> Exhibitions { get; set; }

    }
}