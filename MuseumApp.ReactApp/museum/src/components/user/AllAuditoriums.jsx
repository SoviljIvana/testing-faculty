import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../appSettings';
import { Container, Card, CardColumns, Button,ResponsiveEmbed, CardDeck} from 'react-bootstrap';

class AllAuditoriums extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auditoriums: [],
      };
    }

    componentDidMount() {
       this.getExhibitions();
    }

    getExhibitions() {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
      };

      fetch(`${serviceConfig.baseURL}/api/Auditoriums/get`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
        })
        .then(data => {
          NotificationManager.success('Successfuly fetched data');
          if (data) {
            this.setState({ 
              auditoriums: data,
                 isLoading: false });
            }
        })
        .catch(response => {
            NotificationManager.error(response.message || response.statusText);
            this.setState({ submitted: false });
        });
    }

    getAllExhibitions() {
      return this.state.auditoriums.map(auditorium => {
          return <Card  variant= "top" key={auditorium.id}>
              <Card.Body>
                 <Container>
                    <Card.Text>Auditorium name: {auditorium.nameOfAuditorium}</Card.Text>
                    <Card.Text>Number of seats: {auditorium.numberOfSeats}</Card.Text>
                    </Container>
                    </Card.Body>
                     </Card>
                      })
                    }
 
    render(){
      const exhibitionDetails = this.getAllExhibitions();
      const exhibitions =<Container className= "container-cards"> {exhibitionDetails} </Container>;
      return (
        
                  <CardDeck>
                  {exhibitions}
                  </CardDeck>   
  
      );
  }
}

export default AllAuditoriums;