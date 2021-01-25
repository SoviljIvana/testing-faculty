using Effort;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MuseumApp.Data.Context;
using MuseumApp.Data.Entities;
using MuseumApp.Domain.Services;
using MuseumApp.Repositories;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Transactions;

namespace MuseumApp.Test.IntegrationTests
{
    [TestFixture]

    public class ExhibitionIntegrationTests
    {
        public ExhibitionService service;
        public MuseumContext _context;
        public ExhibitService serviceExhibit;

        [SetUp]
        public void SetUp()
        {
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkSqlServer()
                .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<MuseumContext>();

            builder.UseSqlServer($"Data Source=.;Initial Catalog=Museum;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False")
                    .UseInternalServiceProvider(serviceProvider);


            _context = new MuseumContext(builder.Options);
            _context.Database.Migrate();


            List<ExhibitionEntity> exhibitions = new List<ExhibitionEntity>
            {
                new ExhibitionEntity{ExhibitionId = 11411542, ExhibitionName = "History 1936", AuditoriumId = 1, StartTime = DateTime.Now.AddDays(23) , EndTime =  DateTime.Now.AddDays(63)},
                new ExhibitionEntity{ExhibitionId = 2115419, ExhibitionName = "History 1914", AuditoriumId = 2,  StartTime = DateTime.Now.AddDays(24) , EndTime =  DateTime.Now.AddDays(83)}
            
            };

            _context.Exhibitions.AddRange(exhibitions);
            _context.SaveChanges();

            service = new ExhibitionService(new ExhibitionsRepository(_context), new AuditoriumsRepository(_context), new ExhibitsRepository(_context));


            List<ExhibitEntity> exhibits = new List<ExhibitEntity>
            {
                new ExhibitEntity{ExhibitId = 123143634, ExhibitName = "Key", ExhibitionId = 1, AuditoriumId = 1, Year = 1887},
            };

            _context.Exhibits.AddRange(exhibits);
            _context.SaveChanges();

            serviceExhibit = new ExhibitService(new ExhibitsRepository(_context), new AuditoriumsRepository(_context), new ExhibitionsRepository(_context));
        }

        [TearDown]
        public void Teardown()
        {
            _context.Dispose();
        }

     
  
        [Test]
        public void GetAllExhibitions_CallWithoutParameters_RightTypeOfExhibition()
        {
            var allExhibitionsIntoDb = service.GetAllExhibitions().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitionsIntoDb.ToArray();
            Assert.AreEqual(someDatas[0].TypeOfExhibition, "history");

        }

        [Test]
        public void GetAllExhibitions_CallWithoutParameters_RightTypeOfSecondExhibition()
        {
            var allExhibitionsIntoDb = service.GetAllExhibitions().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitionsIntoDb.ToArray();
            Assert.AreEqual(someDatas[1].TypeOfExhibition, "history");

        }



        [Test]
        public void GetAllExhibitions_CallWithoutParameters_RightExhibitionName()
        {
            var allExhibitionsIntoDb = service.GetAllExhibitions().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitionsIntoDb.ToArray();
            Assert.AreEqual(someDatas[0].ExhibitionName, "Peter Saul: Crime and Punishment");

        }

        [Test]
        public void GetAllExhibits_CallWithoutParameters_RightExhibitionIdForExhibitLastElement()
        {
            var allExhibitsIntoDb = serviceExhibit.GetAllExhibits().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitsIntoDb.ToArray();

            Assert.AreEqual(someDatas[someDatas.Length - 1].ExhibitionId, 1);

        }

        [Test]
        public void GetAllExhibitions_CallWithoutParameters_RightAuditoriumIdOfExhibition()
        {
            var allExhibitionsIntoDb = service.GetAllExhibitions().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitionsIntoDb.ToArray();
            Assert.AreEqual(someDatas[0].AuditoriumId, 1);

        }

   
        [Test]
        public void GetAllExhibits_CallWithoutParameters_RightExhibitName()
        {
            var allExhibitsIntoDb = serviceExhibit.GetAllExhibits().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitsIntoDb.ToArray();
            Assert.AreEqual(someDatas[0].Name, "helmet");

        }

      
        [Test]
        public void GetAllExhibits_CallWithoutParameters_RightExhibitYear()
        {
            var allExhibitsIntoDb = serviceExhibit.GetAllExhibits().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitsIntoDb.ToArray();

            Assert.AreEqual(someDatas[0].Year, 1992);

        }

    
        [Test]
        public void GetAllExhibits_CallWithoutParameters_RightExhibitYearSecondElement()
        {
            var allExhibitsIntoDb = serviceExhibit.GetAllExhibits().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitsIntoDb.ToArray();

            Assert.AreEqual(someDatas[1].Year, 1997);

        }


   
        [Test]
        public void GetAllExhibits_CallWithoutParameters_RightExhibitYearLastElement()
        {
            var allExhibitsIntoDb = serviceExhibit.GetAllExhibits().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitsIntoDb.ToArray();

            Assert.AreEqual(someDatas[someDatas.Length - 1].Year, 1887);

        }


        
        [Test]
        public void GetAllExhibits_CallWithoutParameters_RightExhibitNameLastElement()
        {
            var allExhibitsIntoDb = serviceExhibit.GetAllExhibits().ConfigureAwait(false).GetAwaiter().GetResult();

            var someDatas = allExhibitsIntoDb.ToArray();

            Assert.AreEqual(someDatas[someDatas.Length - 1].Name, "Key");

        }

        
     

    }
}
