import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, CardDeck,Accordion, Jumbotron, Card, Button, ListGroup, ResponsiveEmbed, CardColumns } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig, } from '../../AppSettings';
import Spinner from '../Spinner'
import * as Moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
class ExhibitionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            auditoriumId: '',
            exhibitionName: '',
            typeOfExhibition: '',
            startTime: '',
            endTime: '',
            description: '',
            picture: '',
            exhibits: [],
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getExhibition(id);
    }

    getExhibition(id) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        };
        fetch(`${serviceConfig.baseURL}/api/exhibitions/get/${id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {

                if (data) {
                    this.setState({
                        exhibitionId: data.exhibitionId,
                        auditoriumId: data.auditoriumId,
                        exhibitionName: data.exhibitionName + '',
                        typeOfExhibition: data.typeOfExhibition + '',
                        startTime: data.startTime + '',
                        endTime: data.endTime + '',
                        description: data.description + '',

                        picture: data.picture + '',
                        exhibits: data.exhibits,
                        isLoading: false,
                    });

                }

            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }
    getAllExhibits() {

        return this.state.exhibits.map(exhibit => {
            return <Card className="center1" style={{ width: '20rem' }} className="text-center" key={exhibit.exhibitId}>
                <Container>
                    <div className="inner">
                        <ResponsiveEmbed aspectRatio="4by3">
                            <Card.Img variant="top" src={exhibit.picturePath} />
                        </ResponsiveEmbed>
                    </div>
                </Container>
                <Card.Body>
                <Container >
                        <h6>{exhibit.name}</h6>
                        <h6>Godina {exhibit.year}</h6>
                    </Container>
                </Card.Body>
            </Card>
        })
    }

    render() {
        const { isLoading } = this.state;
        const exhibitDetails = this.getAllExhibits();
        const exhibits = isLoading ? <Spinner></Spinner> : <Container className="container-cards"> {exhibitDetails} </Container>;
        const { exhibitionName, typeOfExhibition, startTime, endTime, description, picture } = this.state;
        return (
            <Container>
                <Jumbotron>
                    <h3 >{exhibitionName} </h3>
                    <Container>
                        <div className="inner">
                            <ResponsiveEmbed aspectRatio="4by3">
                                <Card.Img variant="top" src={picture} />
                            </ResponsiveEmbed>
                        </div>
                    </Container>
                    <hr>
                        </hr>
                    <Accordion defaultActiveKey="1">
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Saznaj nesto više!
                                </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>{description}</Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                        <hr>
                        </hr>
                        <Accordion defaultActiveKey="1">
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                   Pogledaj datum izložbe!
                                </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>    
                                    <h3 > {Moment(startTime).format('LLL')} - {Moment(endTime).format('LLL')} </h3>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                        <hr>
                        </hr>
                        <Accordion defaultActiveKey="1">
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                   Tema 
                                </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>    
                                <h3 > {typeOfExhibition} </h3>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                        <hr>
                        </hr>
                        <Accordion defaultActiveKey="1">
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                   Lista eksponata! 
                                </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>    
                                <CardDeck>
                            {exhibits}
                        </CardDeck>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                </Jumbotron>
            </Container>
        );
    }
}
export default withRouter(ExhibitionDetails);