import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../appSettings';
import { Container, Card, Button,ResponsiveEmbed, CardDeck} from 'react-bootstrap';
import '../../App.css'

class AllExhibitions extends Component {
    constructor(props) {
      super(props);
      this.state = {
        exhibitions: [],
      };
      this.exhibitionDetailss = this.exhibitionDetailss.bind(this);
      this.removeExhibition = this.removeExhibition.bind(this);
      this.editExhibition = this.editExhibition.bind(this);
    }

    componentDidMount() {
      this.getExhibitions();
   }
   

   editExhibition(id){
    this.props.history.push(`editExhibition/${id}`);
  }

  exhibitionDetailss(id){
    this.props.history.push(`exhibitionDetails/${id}`);
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
            NotificationManager.success('Successfully deleted exhibition with id: '+ id);
            const newState = this.state.exhibitions.filter(exhibition => {
                return exhibition.id !== id;
            })
            this.setState({auditoriums: newState});
        })
        .catch(response => {
            NotificationManager.error("Can't remove exhibition.");
            this.setState({ submitted: false });
        });
    }

    getExhibitions() {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
      };

      fetch(`${serviceConfig.baseURL}/api/Exhibitions/get`, requestOptions)
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
               <Card.Title  onClick={() => this.exhibitionDetails(exhibition.exhibitionId)}><h4 >{exhibition.exhibitionName}</h4>
               </Card.Title>
               <Card.Img variant="top"  src= {exhibition.picture} />
               <Card.Text>{exhibition.about} </Card.Text>
               <Card.Footer className="text-muted">Start: {exhibition.startTime} </Card.Footer>
                <Card.Footer className="text-muted"> End: {exhibition.endTime}  </Card.Footer>
                <td>
                  <Button variant="dark"  width = "1%" className="text-center cursor-pointer"  onClick={() => this.exhibitionDetailss(exhibition.exhibitionId)}>SEE DETAILS
                  </Button>
                  </td>
                  <td> <Button variant="dark"  width = "1%" className="text-center cursor-pointer" onClick={() => this.editExhibition(exhibition.exhibitionId)} > CHANGE SOMETHING</Button></td> 
               <td>  <Button variant="dark"  width = "1%" className="text-center cursor-pointer" onClick={() => this.removeExhibition(exhibition.exhibitionId)} >DELETE</Button> </td> 
                       
                  </Card.Body>
                  </Card>
                   })
                  }
 
    render(){
      const exhibitionDetails = this.getAllExhibitions();
      const exhibitions = <Container className= "container-cards"> {exhibitionDetails} </Container>;
      return (
        <CardDeck>{exhibitions}</CardDeck>
  
      );
  }
}

export default AllExhibitions;