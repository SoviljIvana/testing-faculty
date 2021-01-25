import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../appSettings';
import { Container, Card, CardColumns, Button,ResponsiveEmbed, CardDeck} from 'react-bootstrap';
import image1 from '../resources/museum2.jpg'
class About extends Component {
    render(){
      return (
      <div>

          <img src={image1} />
          <div className = "about-content">
          <div className = "heading--about">Lenapehoking: Land of the Lenape</div>
          <div className = "about-text">The Museum of Natural History stands on land that is part of the unceded, ancestral homeland of the Lenape (Delaware) people. As a sign of respect, we recognize and honor the Lenape (Delaware) Nations, their elders past and present, and future generations. We are committed to addressing exclusions and erasures of Indigenous peoples, and confronting the ongoing legacies of settler colonialism in the Museum’s work.</div>


          <div className="heading--about">Our Mission</div>
          <div className = "about-text">To create inspiring encounters with art that expand the ways we see ourselves, the world and its possibilities.</div>

          <div className="heading--about">Our Vision</div>
          <div className = "about-text">Where great art and courageous conversations are catalysts for a more connected, civic, and empathetic world.</div>

          <div className="heading--about">Our Values</div>
          <div className= "heading--text">Great Art and Great Art Experiences</div>
          <div className = "about-text">We hold ourselves to the highest standards of curatorial excellence—from great art and original shows to beautiful installations and canon-expanding scholarship. We strive to create and present inspirational and transformative engagement with our collections, exhibitions, programming, and educational offerings, welcoming all visitors with respect and a true sense of hospitality.</div>


          <div className= "heading--text">Many Histories and a Shared Future</div>
          <div className = "about-text">We work to be conscious of the narratives that shape our visitors’ views of history and their place in the world as well as our own, and we seek out and promote perspectives that expand the stories we tell. We believe the Museum is a place where people can see themselves with dignity and each other with empathy, care, and respect. As a public, civic institution we believe it is our mandate to contribute to the advancement of society with a commitment to true connectedness and diversity.</div>

          <div className= "heading--text">Openness and Free Expression</div>
          <div className = "about-text">We believe that the open and free exchange of ideas among people of diverse beliefs, cultures, and experiences stimulates new understandings and expands insights into our shared humanity and promotes social generosity. We also recognize that differing views may sometimes be met with discomfort and dissent. Since we see ourselves as a conduit for open sharing and learning, we accept the controversies that may accompany courageous conversations.</div>


          <div className= "heading--text">Action and Impact</div>
          <div className = "about-text">We celebrate the cultural vibrancy of our local communities and help build meaningful relationships that elevate and strengthen them. Believing that in action there is hope, we champion the powerful roles art and artists can play in our communities both inside and outside the Museum’s walls.</div>

          <div className= "heading--text">Experimentation and Risk</div>
          <div className = "about-text">In an effort to expand our mission and impact, we strive to be a nimble organization that consistently pursues innovative strategies. We value the challenges associated with trying new things and adapt our strategies as we learn.</div>

          <div className= "heading--text">Professionalism and Passion</div>
          <div className = "about-text">We seek to create a work environment that values hard work, professionalism, accountability, creativity, and achievement. We are committed to creating a community of talented, passionate people who are inspired to make the Museum an important hub of community activity and a great global destination, grow their professional skills, and work collaboratively with colleagues they admire and respect.</div>
      </div> 
      </div>
      );
  }
}

export default About;