using Microsoft.EntityFrameworkCore;
using MuseumApp.Data.Entities;


namespace MuseumApp.Data.Context
{
    public class MuseumContext : DbContext
    {
        public DbSet<AuditoriumEntity> Auditoriums { get; set; }
        public DbSet<ExhibitEntity> Exhibits { get; set; }
        public DbSet<ExhibitionEntity> Exhibitions { get; set; }
        public DbSet<MuseumEntity> Museums { get; set; }

        public MuseumContext(DbContextOptions options)
           : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /// <summary>
            /// Exhibit -> Exhibition relation
            /// </summary>
            /// <returns></returns>
            modelBuilder.Entity<ExhibitEntity>()
                .HasOne(x => x.Exhibition)
                .WithMany(x => x.Exhibits)
                .HasForeignKey(x => x.ExhibitionId)
                .IsRequired();

            /// <summary>
            /// Exhibition -> Exhibit relation
            /// </summary>
            /// <returns></returns>
            modelBuilder.Entity<ExhibitionEntity>()
                .HasMany(x => x.Exhibits)
                .WithOne(x => x.Exhibition)
                .IsRequired();

            /// <summary>
            /// Exhibition -> Auditorium relation
            /// </summary>
            /// <returns></returns>
            modelBuilder.Entity<ExhibitionEntity>()
                .HasOne(x => x.Auditorium)
                .WithMany(x => x.Exhibitions)
                .HasForeignKey(x => x.AuditoriumId)
                .IsRequired();

            /// <summary>
            /// Auditorium -> Exhibition relation
            /// </summary>
            /// <returns></returns>
            modelBuilder.Entity<AuditoriumEntity>()
                .HasMany(x => x.Exhibitions)
                .WithOne(x => x.Auditorium)
                .IsRequired();

            /// <summary>
            /// Auditorium -> Museum relation
            /// </summary>
            /// <returns></returns>
            modelBuilder.Entity<AuditoriumEntity>()
                .HasOne(x => x.Museum)
                .WithMany(x => x.Auditoriums)
                .HasForeignKey(x => x.MuseumId)
                .IsRequired();

            /// <summary>
            /// Museum -> Auditorium relation
            /// </summary>
            /// <returns></returns>
            modelBuilder.Entity<MuseumEntity>()
                .HasMany(x => x.Auditoriums)
                .WithOne(x => x.Museum)
                .IsRequired();
        }
    }
}
