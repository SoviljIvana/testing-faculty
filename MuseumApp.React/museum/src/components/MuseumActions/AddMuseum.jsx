import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormControl, Button, Container, Row, Col, } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';

class AddMuseum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            museumId: 0,
            name: '',
            streetAndNumber: '',
            city: '',
            email: '',
            phoneNumber: '',
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
        const { name, streetAndNumber, city} = this.state;
        if ( name && streetAndNumber && city) {
            this.newMuseum();
        } else {
            NotificationManager.error('Popunite polje podacima.');
            this.setState({ submitted: false });
        }
    }

    newMuseum() {

        const {museumId, name, streetAndNumber, city, email, phoneNumber} = this.state;
        const data = {
            MuseumId: +museumId,
            StreetAndNumber: streetAndNumber,
            City: city,
            Email: email,
            Name: name,
            PhoneNumber: phoneNumber
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
           
            body: JSON.stringify(data)
        };

        fetch(`${serviceConfig.baseURL}/api/museums/post`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(result => {
                NotificationManager.success('Uspešno dodat novi muzej!');
                this.props.history.push('ShowAllMuseums');
            })

            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }


    render() {
        const { museumId, name, streetAndNumber, city, email, phoneNumber, canSubmit , submitted} = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <form onSubmit={this.handleSubmit}>
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
                                    id="name"
                                    type="text"
                                    placeholder="naziv"
                                    value={name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>                         
                            <FormGroup>
                                <FormControl
                                    id="streetAndNumber"
                                    type="text"
                                    placeholder="ulica i broj"
                                    value={streetAndNumber}
                                    onChange={this.handleChange}
                                    
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    id="city"
                                    type="text"
                                    placeholder="grad"
                                    value={city}
                                    onChange={this.handleChange}
                                    
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    id="email"
                                    type="text"
                                    placeholder="email"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    id="phoneNumber"
                                    type="text"
                                    placeholder="broj telefona"
                                    value={phoneNumber}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button  variant="danger" type="submit" disabled={submitted || !canSubmit} block>Dodaj muzej</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(AddMuseum);