import React, { Component,} from 'react';
import Search from './Search';
import { Switch, Route } from 'react-router-dom';

import { Fade } from 'react-slideshow-image';
import { Navbar, Form, Table, Nav, Button,  Container, Image, FormControl, ResponsiveEmbed, DropdownButton, DropdownItem,  Col, Row } from 'react-bootstrap';
import ShowAllExhibitionsForUser from './ExhibitionActions/ShowAllExhibitionsForUser';
import ExhibitionDetails from './ExhibitionActions/ExhibitionDetails';
import CurrentExhibitionsForUser from './ExhibitionActions/CurrentExhibitionsForUser'
import ComingSoonExhibitionsForUser from './ExhibitionActions/ComingSoonExhibitionsForUser'
import Animation from './Animation';
import Contact from './Contact';
import About from '../components/About';
import image1 from './Pictures/imagee.jpg';
import image2 from './Pictures/imagee1.jpg';
import image3 from './Pictures/imagee2.jpg';
import image4 from './Pictures/imagee3.jpg';
import image6 from './Pictures/imagee5.jpg';
import image7 from './Pictures/final1.png';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../AppSettings';
import logo from './Pictures/logo1.png'
const fadeImages = [image1, image2, image3, image4, image6, image7];

const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: false,
    indicators: true,
    onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
    }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            submitted: false,
        };
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    guestToken() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        };

        fetch(`${serviceConfig.baseURL}/get-token?name=gost&guest=true&admin=false&superUser=false`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem("jwt", data.token);
                }
            })
            .catch(response => {
                NotificationManager.error("Neuspešno prijavljivanje.");
                this.setState({ submitted: false });
            });
    }

    
    render() {
      
        return (
            <Row className="no-gutters pr-0 pl-0" >
                <Table>
                    <Navbar sticky="top" className="slide-container" expand="lg" bg="light">
                    <Row>
                                    <Col xs={6} md={4}>
                                    <Animation angle={this.state.angle} />
                                    </Col>
                                </Row>
                        <Nav className="mr-auto">
                            <Container>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Image src={logo} roundedCircle />
                                    </Col>
                                </Row>
                               
                            </Container>
                        </Nav>
                        <Nav className="mr-auto">
                            <Container>
                                <DropdownButton title="IZLOŽBE" className="btn-outline-light" variant="outline-light" size="lg" active>
                                    <DropdownItem href="/home/ShowAllExhibitionsForUser" ><button className="button1">Sve izložbe</button></DropdownItem>
                                    <DropdownItem href="/home/ComingSoonExhibitionsForUser" ><button className="button1">Uskoro </button></DropdownItem>
                                    <DropdownItem href="/home/CurrentExhibitionsForUser" ><button className="button1">Trenutno </button></DropdownItem>
                                </DropdownButton >
                            </Container>
                        </Nav>
                        <Nav className="mr-auto">
                            <Container>
                                <Button  href="/home/about" className="btn-outline-light" size="lg" active> O MUZEJU </Button>
                            </Container>
                        </Nav>
                        <Nav className="mr-auto">
                            <Container>
                                <Button href="/home/contact" className="btn-outline-light" size="lg" > KONTAKT </Button>
                            </Container>
                        </Nav>
                    </Navbar>
                </Table>
                <p className="slide-container">
                    <Fade {...fadeProperties}>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">
                                <img src={fadeImages[0]} />
                            </ResponsiveEmbed>
                     
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">
                                <img src={fadeImages[1]} />
                            </ResponsiveEmbed>
                      
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">

                                <img src={fadeImages[2]} />
                            </ResponsiveEmbed>
                       
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">
                                <img src={fadeImages[3]} />
                            </ResponsiveEmbed>
                      
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">

                                <img src={fadeImages[4]} />
                            </ResponsiveEmbed>
                          
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">
                                <img src={fadeImages[5]} />
                            </ResponsiveEmbed>
                     
                        </div>
                    </Fade>
                </p>
                <Col className="pt-2 app-content-main">
                    <Switch>
                        <Route path="/home/ShowAllExhibitionsForUser" component={ShowAllExhibitionsForUser} />
                        <Route path="/home/ComingSoonExhibitionsForUser" component={ComingSoonExhibitionsForUser} />
                        <Route path="/home/CurrentExhibitionsForUser" component={CurrentExhibitionsForUser} />
                        <Route path="/home/ExhibitionDetails/:id" component={ExhibitionDetails} />
                        <Route path="/home/About" component={About} />
                        <Route path="/home/Contact" component={Contact} />
                    </Switch>
                </Col>
            </Row>
        );
    }
}
export default Home;