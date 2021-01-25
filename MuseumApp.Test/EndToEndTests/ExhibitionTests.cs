using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace MuseumApp.Test.EndToEndTests
{
    [TestFixture]
    public class ExhibitionTests
    {
        private IWebDriver driver;

        [SetUp]
        public void SetUp()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("https://localhost:44363");
        }

        public void Teardown()
        {
            driver.Close();
        }

        [Test]
        public void Index_CallPageAllExhibitions_OpenPageAllExhibitions()
        {

            driver.Navigate().GoToUrl("https://localhost:44363");

            IWebElement btnAllExhibitions = driver.FindElement(By.CssSelector("[href*='/exhibitions']"));

            btnAllExhibitions.Click();

            var url = driver.Url;

            Assert.That(url, Is.EqualTo("https://localhost:44363/api/Exhibitions/get"));
        }

        [Test]
        public void Index_CallPageAddExhibition_OpenPageAddExhibition()
        {

            driver.Navigate().GoToUrl("https://localhost:44363");

            IWebElement btnAddExhibition = driver.FindElement(By.CssSelector("[href*='/add-exhibition']"));

            btnAddExhibition.Click();

            var url = driver.Url;

            Assert.That(url, Is.EqualTo("https://localhost:44363/api/Exhibitions/post"));
        }

        [Test]
        public void Index_CallPageCurrentExhibitions_OpenPageCurrentExhibitions()
        {

            driver.Navigate().GoToUrl("https://localhost:44363");

            IWebElement btnCurrentExhibitions = driver.FindElement(By.CssSelector("[href*='/current-exhibitions']"));

            btnCurrentExhibitions.Click();

            var url = driver.Url;

            Assert.That(url, Is.EqualTo("https://localhost:44363/api/Exhibitions/current-exhibitions"));
        }

        [Test]
        public void Index_CallPageAllAuditoriums_OpenPageAllAuditoriums()
        {

            driver.Navigate().GoToUrl("https://localhost:44363");

            IWebElement btnAllAuditoriums = driver.FindElement(By.CssSelector("[href*='auditoriums']"));

            btnAllAuditoriums.Click();

            var url = driver.Url;

            Assert.That(url, Is.EqualTo("https://localhost:44363/api/Auditoriums/get"));
        }

        [Test]
        public void Index_CallPageAllExhibits_OpenPageAllExhibits()
        {

            driver.Navigate().GoToUrl("https://localhost:44363");

            IWebElement btnAllExhibits = driver.FindElement(By.CssSelector("[href*='/exhibits']"));

            btnAllExhibits.Click();

            var url = driver.Url;

            Assert.That(url, Is.EqualTo("https://localhost:44363/api/Exhibits/get"));
        }
        
        [Test]
        public void Index_CallPageHome_OpenPageHome()
        {

            driver.Navigate().GoToUrl("https://localhost:44363");

            IWebElement btnHome = driver.FindElement(By.CssSelector("[href*='/home']"));

            btnHome.Click();

            var url = driver.Url;

            Assert.That(url, Is.EqualTo("https://localhost:44363/home"));
        }

        [Test]
        public void Index_CallPageAbout_OpenPageAbout()
        {

            driver.Navigate().GoToUrl("https://localhost:44363");

            IWebElement btnAbout = driver.FindElement(By.CssSelector("[href*='/about']"));

            btnAbout.Click();

            var url = driver.Url;

            Assert.That(url, Is.EqualTo("https://localhost:44363/about"));
        }
    }
}
