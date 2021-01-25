import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormControl, Button, Container, Row, Col, FormText, } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';

class EditMuseum extends React.Component {

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

    componentDidMount() {
        const { id } = this.props.match.params; 
        this.getMuseum(id);
    }
    getMuseum(museumId) {   
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
            
        };
    
        fetch(`${serviceConfig.baseURL}/api/museums/get/` + museumId, requestOptions)
            .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({museumId: data.museumId,
                        name: data.name,
                        streetAndNumber: data.streetAndNumber,
                        city: data.city,
                        email: data.email,
                        phoneNumber: data.phoneNumber});
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
        const {museumId, name, streetAndNumber, city, email, phoneNumber} = this.state;
        if (museumId && name && streetAndNumber && city && email && phoneNumber) {
            this.updateMuseum();
        } else {
            NotificationManager.error('Unesite podatke u polje');
            this.setState({ submitted: false });
        }
    }
 
    updateMuseum() {

        const {museumId, name, streetAndNumber, city, email, phoneNumber} = this.state;
        const data = {
            museumId: museumId,
            name: name,
            streetAndNumber: streetAndNumber,
            city: city,
            email: email,
            phoneNumber: phoneNumber
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
        
        fetch(`${serviceConfig.baseURL}/api/museums/${museumId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(data => {
                if(data){
                    this.setState({
                        name: data.name,
                        streetAndNumber: data.streetAndNumber,
                        city: data.city,
                        email: data.email,
                        phoneNumber: data.phoneNumber
                    });
                }
            })
            .then(result => {
                this.props.history.goBack();
                NotificationManager.success('Uspešno izmenjen muzej!');
            })
            .catch(response => {
                NotificationManager.error("Ne možete izmeniti podatke o muzeju. ");
                this.setState({ submitted: false });
            });
    }

    render() {
        const { name, streetAndNumber, city, email, phoneNumber, canSubmit , submitted} = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <form onSubmit={this.handleSubmit}>
                        
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

                           
                            <Button  variant="danger" type="submit" disabled={submitted || !canSubmit} block>Izmeni podatke o muzeju</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(EditMuseum);