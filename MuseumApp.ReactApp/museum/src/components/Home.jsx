import React, { Component } from 'react';

import '../App.css';
import image1 from './resources/p02hhfzm.jpg';
import image2 from './resources/shutterstock_438357028_lz7xlx.jpg'
import image3 from './resources/vasa-museum-03.jpg';
import image4 from './resources/p0640zpg.jpg';
import image5 from './resources/shutterstock_235506019.webp';
import image6 from './resources/african-artifacts-return-museums.jpg';
import image7 from './resources/att-brand-museum-600x400.jpg';
import image8 from './resources/bramante-staircase.jpg';
import image9 from './resources/csm_25-IMG_9284-A_8d12cbc6d6.jpg';
import image10 from './resources/ioana-cristiana-FFBkz2lOTkE-unsplash.jpg'
class Home extends Component {
  
    render(){

      return (
       <div className="accordion-homepage">
   
         <div className= "accordion-homepage--row">
          <div className = "accordion-homepage--column">    
          <img src = {image2} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column">   
          <img src = {image3} width = "100%"/>
          </div>
        </div>

        <div className="heading">Historic Houses and Sites Network</div>
          <div className="text-home">The goal of the Historic Houses and Sites Network is to create and maintain a welcoming network of museum professionals dedicated to the interpretation and preservation of important public histories, architecture, and culture. The Historic Houses and Sites Network is committed to furthering the mission of the American Alliance of Museums by engaging our members with relevant research and resources.We welcome professionals from all levels and areas of expertise within historic houses or sites. The success of our network depends on the shared contributions of our members. We are a large network with diverse members in terms of mission, geography, organizational size, and program approach. This diversity is a strength; we have a wealth of experience and talent to draw from and commonly represent most museum disciplines within each institution.
          </div>

          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column">    
          <img className="image-left-padding" src = {image6} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column right-text">   
         <p>Although this film cannot replace the experience of seeing the exhibition in person at the National Gallery, it will allow us to share Artemisia’s story and paintings with as many people as possible, in particular those who cannot make it to Trafalgar Square right now.” – Letizia Treves </p>
          </div>
          </div>


          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column left-text">   
          <div> 
          <p>Although this film cannot replace the experience of seeing the exhibition in person at the National Gallery, it will allow us to share Artemisia’s story and paintings with as many people as possible, in particular those who cannot make it to Trafalgar Square right now.”– Letizia Treves </p></div>
          </div>
          <div className = "accordion-homepage--column">  
           <img className="image-right-padding" src = {image7} width = "100%"/>
          </div>
          </div>


          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column">    
          <img className="image-left-padding" src = {image8} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column  right-text">   
         <p>“This is the principle underlying hundreds of Black history museums nationwide — that seeing yourself represented and understanding your history is a fundamental right.” </p>
          </div>
          </div>

          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column  left-text">   
          <div>  
          <p>Although this film cannot replace the experience of seeing the exhibition in person at the National Gallery, it will allow us to share Artemisia’s story and paintings with as many people as possible, in particular those who cannot make it to Trafalgar Square right now.”

– Letizia Treves </p></div>
          </div>
          <div className = "accordion-homepage--column">   
       
<img className="image-right-padding" src = {image9} width = "100%"/>
          </div>
          </div>


          <div className= "accordion-homepage--row image-text">
          <div className = "accordion-homepage--column">    
          <img className="image-left-padding" src = {image10} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column right-text">   
         <p>“Just to witness the very best of modern medicine in action alongside the whole history of humanity’s centuries of effort to understand and overcome disease is hard to describe.”

–Nat Edwards, Director, Thackray Museum of Medicine </p>
          </div>
          </div>

          <div className="heading">For Post-Pandemic Success, Get Creative with Distributed Museum Models</div>
          <div className="text-home">As the global pandemic has put a halt to in-person visitation for much of 2020 and brought long-held planning and operational models into question, museum leaders across the country have been grappling with challenges of how to prepare for a future that will likely bring profound shifts and a need to preserve resources. At the same time, many institutions remain rightfully committed to the goals of expanding audiences and increasing equitable access to their collections, programming, and other content. How will they balance these two imperatives?

One possibility is a creative rethinking of the distributed museum model. This major global trend has reinvented museums over the last several decades, with many institutions extending their reach by opening satellite locations in new neighborhoods, cities, and countries. In the current period, it is worth exploring how museum leaders can build on and reshape their visitation along these lines—finding ways to defray certain costs typically associated with expansion, while still broadening engagement.

As architects working with cultural institutions, hospitality groups, commercial organizations, and developers of residential communities across the country and around the world, our firm CetraRuddy has explored a number of ideas that can be of value in this context. Potential solutions range from less resource-intensive expansions utilizing pop-up spaces, for example, to creative partnerships with community organizations and national brands, and even facilities co-located within mixed-use real estate developments, or new ideas in exploring hybrid physical/digital models.

There are many opportunities to reimagine long-term visions and institutional missions—here are a few ideas and strategies that museum leaders might consider.
          </div>

        <div className= "accordion-homepage--row">
          <div className = "accordion-homepage--column">    
          <img src = {image1} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column">   <img src = {image4} width = "100%"/></div>
          </div>
          <div className = "pre-footer"></div>
        
         </div>
      
      );
  }
}

export default Home;