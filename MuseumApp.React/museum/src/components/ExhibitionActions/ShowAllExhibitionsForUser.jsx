import React, { Component,  } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';
import { Container, Card, CardColumns, Button,ResponsiveEmbed} from 'react-bootstrap';
import Spinner from '../Spinner';
import * as Moment from 'moment';  

import "react-datepicker/dist/react-datepicker.css";

class ShowAllExhibitionsForUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            exhibitions: [],
            isLoading: true,
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
        console.log(requestOptions);
            this.setState({isLoading: true});
            fetch(`${serviceConfig.baseURL}/api/Exhibitions/get`, requestOptions)
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

        getAllExhibitions() {
            return this.state.exhibitions.map(exhibition => {
                return <Card className = "center1" style={{ width: '20rem' }} className="text-center"  key={exhibition.id}>
                         <hr>
                        </hr>
                <Container>
                    <div className="inner">
                    <ResponsiveEmbed aspectRatio="4by3">
                  <Card.Img variant="top" src= {exhibition.picture} /> 
                  </ResponsiveEmbed>
                 </div>
                </Container>   
                <Container >
                    <Button>
                    <Card.Header  onClick={() => this.exhibitionDetails(exhibition.exhibitionId)}><h4 >{exhibition.exhibitionName}</h4></Card.Header>
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
                  <hr>
                        </hr>
            </Card>
            })
        }
        
        exhibitionDetails(id){
            this.props.history.push(`exhibitionDetails/${id}`);
        }

        render(){
            const {isLoading} = this.state;
            const exhibitionDetails = this.getAllExhibitions();
            const exhibitions =<Container className= "container-cards"> {exhibitionDetails} </Container>;
            return (
              
                        <CardColumns>
                            <h1>exhibitions</h1>
                        {exhibitions}
                        </CardColumns>   
        
            );
        }
    }

export default ShowAllExhibitionsForUser;