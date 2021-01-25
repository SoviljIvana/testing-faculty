import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormControl, Button, Container, Row, Col, } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';

class AddAuditorium extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auditoriumId: '',
            museumId: '',
            nameOfAuditorium: '',
            numberOfSeats: '',
            submitted: false,
            canSubmit: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { numberOfSeats,  nameOfAuditorium } = this.state;
        if (numberOfSeats && nameOfAuditorium) {
            this.newAuditorium();
        } else {
            NotificationManager.error('Molim vas popunite polje.');
            this.setState({ submitted: false });
        }
    }

    newAuditorium() {
        const {auditoriumId, nameOfAuditorium,  museumId, numberOfSeats } = this.state;
        const data = {
            AuditoriumId: +auditoriumId,
            NameOfAuditorium: nameOfAuditorium,
            MuseumId: +museumId,
            NumberOfSeats: +numberOfSeats,
            
        };
        const requestOptions = {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify(data)
        };

        fetch(`${serviceConfig.baseURL}/api/auditoriums/post`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(result => {
                NotificationManager.success('Uspešno je dodata nova sala!');
                this.props.history.push('ShowAllAuditoriums');
            })

            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }


    render() {
        const {  numberOfSeats, submitted,  nameOfAuditorium, museumId, auditoriumId, canSubmit } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormControl
                                    id="nameOfAuditorium"
                                    type="text"
                                    placeholder="naziv sale"
                                    value={nameOfAuditorium}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>                         
                            <FormGroup>
                                <FormControl
                                    id="numberOfSeats"
                                    type="number"
                                    placeholder="broj sedišta"
                                    value={numberOfSeats}
                                    onChange={this.handleChange}
                                    max="36"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    id="museumId"
                                    type="number"
                                    placeholder="id muzeja"
                                    value={museumId}
                                    onChange={this.handleChange}
                                    
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    id="auditoriumId"
                                    type="number"
                                    placeholder="id sale"
                                    value={auditoriumId}
                                    onChange={this.handleChange}
                                    
                                />
                            </FormGroup>
                            <Button  variant="danger" type="submit" disabled={submitted || !canSubmit} block>Dodaj salu</Button>
                        </form>
                    </Col>
                </Row>
              
            </Container>
        );
    }
}
export default withRouter(AddAuditorium);
