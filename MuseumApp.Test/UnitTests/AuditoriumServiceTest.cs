using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;
using MuseumApp.Controllers;
using Microsoft.EntityFrameworkCore;
using MuseumApp.Models;
using MuseumApp.Domain;
using MuseumApp.Repositories;
using MuseumApp.Data.Entities;
using MuseumApp.Data;
using MuseumApp.Domain.Services;

namespace MuseumApp.Test.Services
{
    [TestClass]
    public class AuditoriumServiceTest
    {
        private Mock<IAuditoriumsRepository> _mockAuditoriumsRepository;
        private Mock<IMuseumsRepository> _mockMuseumRepository;
        private Mock<IExhibitionsRepository> _mockExhibitionRepository;
        private AuditoriumEntity _auditorium;
        private AuditoriumEntity _newAuditorium;
        private MuseumEntity _museum;
        private ExhibitionEntity _exhibition;
        private AuditoriumDomainModel _auditoriumDomainModel;
        private List<AuditoriumEntity> _listOFAuditoriums;
        private List<ExhibitionEntity> _listOfExhibitions;

        [TestInitialize]
        public void TestInitialize()
        {
            _auditorium = new AuditoriumEntity()
            {
                AuditoriumId = 1,
                MuseumId = 1,
                AuditoriumName = "AuditoriumName",
            };
            _auditoriumDomainModel = new AuditoriumDomainModel()
            {
                AuditoriumId = 1,
                NameOfAuditorium = "AuditoriumName",
                MuseumId = 1
            };
            _museum = new Data.MuseumEntity()
            {
                MuseumName = "MuseumName",
                MuseumId = 1
            };
            _newAuditorium = new AuditoriumEntity();
            _newAuditorium = _auditorium;
            _exhibition = new ExhibitionEntity()
            {
                AuditoriumId = 1,
                StartTime = DateTime.Now.AddDays(1),            
            };
            _listOfExhibitions = new List<ExhibitionEntity>();
            _listOfExhibitions.Add(_exhibition);
            _listOFAuditoriums = new List<AuditoriumEntity>();
            _listOFAuditoriums.Add(_auditorium);

            _mockAuditoriumsRepository = new Mock<IAuditoriumsRepository>();
            _mockMuseumRepository = new Mock<IMuseumsRepository>();
            _mockExhibitionRepository = new Mock<IExhibitionsRepository>();


        }

        [TestMethod]
        public void AuditoriumsService_GetAllAsync_ReturnNull()
        {
            //Arrange
            IEnumerable<AuditoriumEntity> auditoriums = null;
            Task<IEnumerable<AuditoriumEntity>> responseTask = Task.FromResult(auditoriums);
            _mockAuditoriumsRepository = new Mock<IAuditoriumsRepository>();
            _mockAuditoriumsRepository.Setup(x => x.GetAll()).Returns(responseTask);
            AuditoriumService auditoriumController = new AuditoriumService(_mockAuditoriumsRepository.Object, _mockExhibitionRepository.Object, _mockMuseumRepository.Object);
           
            //Act
            var resultAction = auditoriumController.GetAllAuditoriums().ConfigureAwait(false).GetAwaiter().GetResult();
            var result = (List<AuditoriumDomainModel>)resultAction;
            
            //Assert
            Assert.IsNull(result);
        }

        [TestMethod]
        public void AuditoriumsService_GetAuditoriumByIdAsync_ReturnAuditoriumDomainModel()
        {
            //Arrange
            AuditoriumEntity auditorium = _auditorium;
            Task<AuditoriumEntity> responseTask = Task.FromResult(auditorium);
            _mockAuditoriumsRepository = new Mock<IAuditoriumsRepository>();
            _mockAuditoriumsRepository.Setup(x => x.GetByIdAsync(It.IsAny<int>())).Returns(responseTask);
            AuditoriumService auditoriumController = new AuditoriumService(_mockAuditoriumsRepository.Object, _mockExhibitionRepository.Object, _mockMuseumRepository.Object);
           
            //Act
            var resultAction = auditoriumController.GetAuditoriumByIdAsync(It.IsAny<int>()).ConfigureAwait(false).GetAwaiter().GetResult();
            
            //Assert
            Assert.IsNotNull(resultAction);
            Assert.IsInstanceOfType(resultAction, typeof(AuditoriumDomainModel));
            Assert.AreEqual(resultAction.MuseumId, auditorium.MuseumId);
        }

        [TestMethod]
        public void AuditoriumsService_GetAllAsync_ReturnListOfAuditoriumDomainModel()
        {
            //Arrange
            int expectedResultCount = 1;
            IEnumerable<AuditoriumEntity> auditoriums = _listOFAuditoriums;
            Task<IEnumerable<AuditoriumEntity>> responseTask = Task.FromResult(auditoriums);
            _mockAuditoriumsRepository = new Mock<IAuditoriumsRepository>();
            _mockAuditoriumsRepository.Setup(x => x.GetAll()).Returns(responseTask);
            AuditoriumService auditoriumController = new AuditoriumService(_mockAuditoriumsRepository.Object, _mockExhibitionRepository.Object, _mockMuseumRepository.Object);
            //Act
            var resultAction = auditoriumController.GetAllAuditoriums().ConfigureAwait(false).GetAwaiter().GetResult();
            var result = (List<AuditoriumDomainModel>)resultAction;
            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(expectedResultCount, result.Count);
            Assert.AreEqual(_auditorium.AuditoriumId, result[0].AuditoriumId);
            Assert.IsInstanceOfType(result[0], typeof(AuditoriumDomainModel));
        }

        [TestMethod]
        public void AuditoriumsService_GetAuditoriumByIdAsync_ReturnNull()
        {
            //Arrange
            AuditoriumEntity auditorium = null;
            Task<AuditoriumEntity> responseTask = Task.FromResult(auditorium);
            _mockAuditoriumsRepository = new Mock<IAuditoriumsRepository>();
            _mockAuditoriumsRepository.Setup(x => x.GetByIdAsync(It.IsAny<int>())).Returns(responseTask);
            AuditoriumService auditoriumController = new AuditoriumService(_mockAuditoriumsRepository.Object, _mockExhibitionRepository.Object, _mockMuseumRepository.Object);
           
            //Act
            var resultAction = auditoriumController.GetAuditoriumByIdAsync(It.IsAny<int>()).ConfigureAwait(false).GetAwaiter().GetResult();
           
            //Assert
            Assert.IsNull(resultAction);
        }


        [TestMethod]
        public void AuditoriumService_DeleteAuditorium_AuditoriumResultModel_AUDITORIUM_DOES_NOT_EXIST()
        {
            //Arrange
            AuditoriumResultModel expectedResultModel = new AuditoriumResultModel()
            {
                ErrorMessage = "Auditorium not found: "
            };
            AuditoriumEntity auditorium = null;
            _mockAuditoriumsRepository = new Mock<IAuditoriumsRepository>();
            Task<AuditoriumEntity> responseTask = Task.FromResult(auditorium);
            _mockAuditoriumsRepository.Setup(x => x.GetByIdAsync(It.IsAny<int>())).Returns(responseTask);
            AuditoriumService auditoriumController = new AuditoriumService(_mockAuditoriumsRepository.Object, _mockExhibitionRepository.Object, _mockMuseumRepository.Object);

            //Act
            var resultAction = auditoriumController.DeleteAuditoriumAsync(It.IsAny<int>()).ConfigureAwait(false).GetAwaiter().GetResult();
            //Assert
            Assert.IsNotNull(resultAction);
            Assert.IsFalse(resultAction.IsSuccessful);
            Assert.AreEqual(expectedResultModel.ErrorMessage, resultAction.ErrorMessage);
            Assert.IsInstanceOfType(resultAction, typeof(AuditoriumResultModel));
        }


    }
}
