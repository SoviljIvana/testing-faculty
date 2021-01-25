import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../appSettings';
import logo from './resources/museum (1).png'
import '../App.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };}


    render() {
        return (
          <div className = "header">
            <ul className = "header table-row">
             <li><img src = {logo} width = "40%"/></li>
             <li className="logo-text">Museum of Natural History</li>
             <li><Nav.Link href="/auditoriums">Auditoriums</Nav.Link></li>
             <li><Nav.Link href="/exhibits">Exhibits</Nav.Link></li>
             <li>
             <NavDropdown title="Exhibitions" id="basic-nav-dropdown"> 
              <NavDropdown.Item href="/exhibitions">All exhibitions</NavDropdown.Item>
              <NavDropdown.Item href="/current-exhibitions">Current exhibitions</NavDropdown.Item>
              <NavDropdown.Item href="/add-exhibition">Add exhibition</NavDropdown.Item>
             </NavDropdown>
             </li>
             <li><Nav.Link href="/about">About</Nav.Link></li>
             <li><Nav.Link href="/home">Home</Nav.Link></li>
            </ul>
          </div>
        );
      }
}

export default Header;