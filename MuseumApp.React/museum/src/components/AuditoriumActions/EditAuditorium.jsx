import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormControl, Button, Container, Row, Col, FormText, } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';

class EditAuditorium extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            numberOfSeats: 0,
            nameOfAuditorium: '',
            auditoriumId: 0,
            museumId: '',            
            submitted: false,
            canSubmit: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params; 
        this.getAuditorium(id);
    }
    getAuditorium(auditoriumId) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
           
        };
    
        fetch(`${serviceConfig.baseURL}/api/auditoriums/get/` + auditoriumId, requestOptions)
            .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({nameOfAuditorium: data.nameOfAuditorium,
                        numberOfSeats: data.numberOfSeats,
                        museumId: data.museumId,
                        auditoriumId: data.auditoriumId,
                        id: data.id});
                }
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
        }
    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
      
            }


    handleSubmit(e) {

        e.preventDefault();
        this.setState({ submitted: true });
        const {auditoriumId, museumId, nameOfAuditorium, numberOfSeats} = this.state;
        if (auditoriumId && museumId && nameOfAuditorium && numberOfSeats) {
            this.updateAuditorium();
        } else {
            NotificationManager.error('Molim vas popunite polje.');
            this.setState({ submitted: false });
        }
    }
 
    updateAuditorium() {

        const { auditoriumId, museumId, nameOfAuditorium, numberOfSeats} = this.state;
        const data = {
            auditoriumId: auditoriumId,
            museumId: museumId,
            nameOfAuditorium: nameOfAuditorium, 
            numberOfSeats: +numberOfSeats
        };

        const requestOptions = {
            method: 'PUT',
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify(data)
        };

        console.log(JSON.stringify("REQ_OPT:" + requestOptions.body));
        
        fetch(`${serviceConfig.baseURL}/api/auditoriums/put/${auditoriumId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(data => {
                if(data){
                    this.setState({
                        nameOfAuditorium : data.nameOfAuditorium,
                        numberOfSeats: data.numberOfSeats
                    });
                }
            })
            .then(result => {
                this.props.history.goBack();
                NotificationManager.success('Uspešno izmenjena sala!');
            })
            .catch(response => {
                NotificationManager.error("Ne možete izmeniti salu.");
                this.setState({ submitted: false });
            });
    }

    render() {
        const {nameOfAuditorium, numberOfSeats, canSubmit , submitted} = this.state;
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
                            <Button  variant="danger" type="submit" disabled={submitted || !canSubmit} block>Izmena sale</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(EditAuditorium);