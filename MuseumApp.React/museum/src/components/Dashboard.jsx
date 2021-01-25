import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import { Navbar, Table,Image, Nav,ResponsiveEmbed, Button, Container, NavDropdown } from 'react-bootstrap';
import ShowAllMuseums from './MuseumActions/ShowAllMuseums';
import ShowAllAuditoriums from './AuditoriumActions/ShowAllAuditoriums';
import ShowAllExhibitions from './ExhibitionActions/ShowAllExhibitions';
import ShowAllExhibits from './ExhibitActions/ShowAllExhibits'
import ShowAllTickets from './TicketActions/ShowAllTickets'
import ShowAllUsers from './UserActions/ShowAllUsers'
import AddMuseum from './MuseumActions/AddMuseum';
import AddAuditorium from './AuditoriumActions/AddAuditorium';
import AddExhibition from './ExhibitionActions/AddExhibition';
import AddExhibit from './ExhibitActions/AddExhibit'
import AuditoriumDetails from './AuditoriumActions/AuditoriumDetails';
import ExhibitionDetails from './ExhibitionActions/ExhibitionDetails';
import MuseumDetails from './MuseumActions/MuseumDetails';
import ExhibitDetails from './ExhibitActions/ExhibitDetails';
import TicketDetails from './TicketActions/TicketDetails';
import UserDetails from './UserActions/UserDetails';
import EditUser from './UserActions/EditUser'
import EditAuditorium from './AuditoriumActions/EditAuditorium'
import EditExhibition from './ExhibitionActions/EditExhibition'
import EditExhibit from './ExhibitActions/EditExhibit'
import EditMuseum from './MuseumActions/EditMuseum'
import CurrentExhibitions from './ExhibitionActions/CurrentExhibitions'
import ComingSoonExhibitions from './ExhibitionActions/ComingSoonExhibitions'
import './App.css';
import photoshopPicture from './Pictures/final1.png';


class Dashboard extends Component {

    render() {
        return (
            <Row className="no-gutters pr-1 pl-1" className = "content-row">
                <Table>
                    <Navbar sticky="top" className="slide-container"  expand="lg" bg="dark" variant="dark">
                        <Nav className="mr-auto">
                            <Container>
                                <NavDropdown title="Izložba"  >
                                    <NavDropdown.Item className="navbar-item" >
                                        <Link to='/dashboard/ShowAllExhibitions'>
                                            <Button className="button" variant="white" >Sve izložbe</Button></Link>
                                    </NavDropdown.Item >
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className="navbar-item" >
                                        <Link to='/dashboard/ComingSoonExhibitions'>
                                            <Button className="button" variant="white" >Uskoro će se prikazivati</Button></Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/CurrentExhibitions'>
                                            <Button className="button" variant="white" >Trenutno se prikazuju</Button></Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/AddExhibition'>
                                            <Button className="button" variant="white">Dodaj izložbu</Button></Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Container>
                        </Nav>
                        <Nav className="mr-auto">
                            <Container>
                                <NavDropdown title="Muzej" id="basic-nav-dropdown">
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/ShowAllMuseums'>
                                            <Button className="button" variant="white" >Lista muzeja</Button></Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/AddMuseum'>
                                            <Button className="button" variant="white">Dodaj muzej</Button></Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Container>
                        </Nav>
                        {/* <Nav className="mr-auto">
                            <Container>
                                <NavDropdown title="Sala" id="basic-nav-dropdown">
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/ShowAllAuditoriums'>
                                            <Button className="button" variant="white" >Sve sale</Button></Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/AddAuditorium'>
                                            <Button className="button" variant="white" >Dodaj salu</Button></Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Container>
                        </Nav> */}
                        <Nav className="mr-auto">
                            <Container>
                                <NavDropdown title="Eksponat" id="basic-nav-dropdown">
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/ShowAllExhibits'>
                                            <Button className="button" variant="white">Svi eksponati</Button></Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/AddExhibit'>
                                            <Button className="button" variant="white">Dodaj eksponat</Button></Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Container>
                        </Nav>
                        {/* <Nav className="mr-auto">
                            <Container>
                                <NavDropdown title="Karta" id="basic-nav-dropdown">
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/ShowAllTickets'>
                                            <Button className="button" variant="white" >Sve karte</Button></Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Container>
                        </Nav> */}
                        <Nav className="mr-auto">
                            <Container>
                                <NavDropdown title="Korisnik" id="basic-nav-dropdown">
                                    <NavDropdown.Item className="navbar-item">
                                        <Link to='/dashboard/ShowAllUsers'>
                                            <Button className="button" variant="white">Svi korisnici</Button></Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Container>
                        </Nav>
                    </Navbar>
                </Table>
                <Container>
                                {/* <Row>
                                    <Col xs={6} md={4}>
                                        <Image src={photoshopPicture}  />
                                    </Col>
                                </Row> */}
                            </Container>
                <Col className="pt-2 app-content-main">
                    <Switch>
                        <Route path="/dashboard/ShowAllMuseums" component={ShowAllMuseums} />
                        <Route path="/dashboard/ShowAllAuditoriums" component={ShowAllAuditoriums} />
                        <Route path="/dashboard/ShowAllExhibitions" component={ShowAllExhibitions} />
                        <Route path="/dashboard/ComingSoonExhibitions" component={ComingSoonExhibitions} />
                        <Route path="/dashboard/CurrentExhibitions" component={CurrentExhibitions} />
                        <Route path="/dashboard/ShowAllExhibits" component={ShowAllExhibits} />
                        <Route path="/dashboard/ShowAllTickets" component={ShowAllTickets} />
                        <Route path="/dashboard/ShowAllUsers" component={ShowAllUsers} />
                        <Route path="/dashboard/AddMuseum" component={AddMuseum} />
                        <Route path="/dashboard/AddAuditorium" component={AddAuditorium} />
                        <Route path="/dashboard/AddExhibition" component={AddExhibition} />
                        <Route path="/dashboard/AddExhibit" component={AddExhibit} />
                        <Route path="/dashboard/AuditoriumDetails/:id" component={AuditoriumDetails} />
                        <Route path="/dashboard/ExhibitionDetails/:id" component={ExhibitionDetails} />
                        <Route path="/dashboard/MuseumDetails/:id" component={MuseumDetails} />
                        <Route path="/dashboard/ExhibitDetails/:id" component={ExhibitDetails} />
                        <Route path="/dashboard/TicketDetails/:id" component={TicketDetails} />
                        <Route path="/dashboard/UserDetails/:id" component={UserDetails} />
                        <Route path="/dashboard/EditUser/:id" component={EditUser} />
                        <Route path="/dashboard/EditAuditorium/:id" component={EditAuditorium} />
                        <Route path="/dashboard/EditExhibition/:id" component={EditExhibition} />
                        <Route path="/dashboard/EditExhibit/:id" component={EditExhibit} />
                        <Route path="/dashboard/EditMuseum/:id" component={EditMuseum} />
                    </Switch>
                </Col>
            </Row>
        );
    }
}
export default Dashboard;

