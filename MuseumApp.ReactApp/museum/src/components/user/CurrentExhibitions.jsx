import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../appSettings';
import { Container, Card, CardColumns,CardDeck, Button,ResponsiveEmbed} from 'react-bootstrap';
import '../../App.css'

class CurrentExhibitions extends Component {
    constructor(props) {
      super(props);
      this.state = {
        exhibitions: [],
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

      fetch(`${serviceConfig.baseURL}/api/Exhibitions/get/currentExhibitions`, requestOptions)
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
              exhibitions: data,
                 isLoading: false });
            }
        })
        .catch(response => {
            NotificationManager.error(response.message || response.statusText);
            this.setState({ submitted: false });
        });
    }

    getAllExhibitions() {
      return this.state.exhibitions.map(exhibition => {
          return <Card variant="top"  key={exhibition.id}>
                   
          <Card.Body>
          <Card.Title  onClick={() => this.exhibitionDetails(exhibition.exhibitionId)}><h4 >{exhibition.exhibitionName}</h4></Card.Title>
         
          <Card.Img variant="top"  src= {exhibition.picture} />
          <Card.Text>{exhibition.about} </Card.Text>
        
             <Card.Footer className="text-muted">Start: {exhibition.startTime} </Card.Footer>
     
             <Card.Footer className="text-muted"> End: {exhibition.endTime}  </Card.Footer>
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

export default CurrentExhibitions;