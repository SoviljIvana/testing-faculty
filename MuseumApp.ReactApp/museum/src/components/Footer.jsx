import React, { Component } from 'react';
import linkedin from './resources/linkedin.png'
import facebook from './resources/facebook-circular-logo.png'
import instagram from './resources/instagram.png'

class Footer extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
        };
      
    }
    
    render(){
        return (
            <div className = "footer">
                <div className = "footer-content">
                <ul>
                    <li>Museum of Natural History</li>
                    <li>New York</li>
                    <li>Phone: 212-345-1233</li>
                </ul>
                <ul>
                    <li><a>Contact us</a></li>
                    <li><a>Visitor information</a></li>
                    <li><a>About the museum</a></li>
                </ul>
                <ul>
                    <li><a>Shops</a></li>
                   
                </ul>
                <ul className = "icons-footer">
               <a><img src={linkedin} /></a>
               <a> <img src={facebook} /></a>
               <a> <img src={instagram} /></a>
                    </ul>
            </div>
          </div>
        );
    }
}

export default Footer;