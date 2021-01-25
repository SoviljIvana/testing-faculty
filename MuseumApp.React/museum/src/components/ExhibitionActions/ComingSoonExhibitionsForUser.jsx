import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';
import {Button, CardColumns, Card ,Container,ResponsiveEmbed } from 'react-bootstrap';
import Spinner from '../Spinner'
import * as Moment from 'moment';  

import "react-datepicker/dist/react-datepicker.css";
class ComingSoonExhibitionsForUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            exhibitions: [],
            isLoading: true
        }
        this.exhibitionDetails = this.exhibitionDetails.bind(this);

    }

    componentDidMount(){
      this.getExhibitions();
    }

    getExhibitions(){
        const requestOptions = {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
           };
            this.setState({isLoading: true});
            fetch(`${serviceConfig.baseURL}/api/Exhibitions/get/comingSoon`, requestOptions)
              .then(response => {
                if (!response.ok) {
                  return Promise.reject(response);
              }
              return response.json();
              })
              .then(data => {
                if (data) {
                  this.setState({ 
                    exhibitions: data,
                       isLoading: false });
                  }
              })
              .catch(response => {
                  NotificationManager.error(response.message || response.statusText);
                  this.setState({ isLoading: false });
              });
        }

        removeExhibition(id) {
            const requestOptions = {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt')
              }
             
          };
      
          fetch(`${serviceConfig.baseURL}/api/exhibitions/delete/${id}`, requestOptions)
              .then(response => {
                  if (!response.ok) {
                      return Promise.reject(response);
                  }
                  return response.statusText;
              })
              .then(result => {
                  NotificationManager.success('Uspešno izbrisana izložba sa id: '+ id);
                  const newState = this.state.exhibitions.filter(exhibition => {
                      return exhibition.id !== id;
                  })
                  this.setState({auditoriums: newState});
              })
              .catch(response => {
                  NotificationManager.error("Ne možete izbrisati izložbu.");
                  this.setState({ submitted: false });
              });
          }
    

          getAllExhibitions() {

            return this.state.exhibitions.map(exhibition => {
                return <Card className = "center1" style={{ width: '20rem' }} className="text-center"  key={exhibition.id}>
                <Container>
                    <div className="inner">
                    <ResponsiveEmbed aspectRatio="4by3">
                  <Card.Img variant="top" src= {exhibition.picture} /> 
                  </ResponsiveEmbed>
                 </div>
                </Container>   
                <Container >
                    <Button>
                    <Card.Header onClick={() => this.exhibitionDetails(exhibition.exhibitionId)}><h4 >{exhibition.exhibitionName}</h4></Card.Header>
                    </Button>
                </Container>
                    <Card.Body>
                <Container>
                    <Card.Text> {exhibition.about}</Card.Text>
                </Container>
                </Card.Body>
                <Container>
                Otvaranje:  <Card.Footer className="text-muted">
                  { Moment(exhibition.startTime).format('LLL') }
                </Card.Footer>
                  Zatvaranje: <Card.Footer className="text-muted">  {Moment(exhibition.endTime).format('LLL')}    </Card.Footer></Container>
            </Card>
            })
        }
        
        exhibitionDetails(id){
            this.props.history.push(`exhibitionDetails/${id}`);
        }

        render(){
            const {isLoading} = this.state;
            const exhibitionDetails = this.getAllExhibitions();
            const exhibitions = isLoading ? <Spinner></Spinner> :<Container className= "container-cards"> {exhibitionDetails} </Container>;
            return (
                        <CardColumns>
                        {exhibitions}
                        </CardColumns>   
        
            );
        }
    }

export default ComingSoonExhibitionsForUser;