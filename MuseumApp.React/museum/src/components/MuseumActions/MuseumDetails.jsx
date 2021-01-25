import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, FormText} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig,  } from '../../AppSettings';

class MuseumDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            streetAndNumber: '',
            city : '',
            email : '',
            phoneNumber : ''
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getMuseum(id);
    }
    
    getMuseum(id) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
            
        };
        fetch(`${serviceConfig.baseURL}/api/museums/get/${id}` , requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({
                        museumId: data.museumId,
                        name: data.name + '',
                        streetAndNumber: data.streetAndNumber +'',
                        city : data.city +  '',
                        email : data.email + '',
                        phoneNumber : data.phoneNumber +  ''
                    });
                }
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }

    render() {
        const {museumId, name, streetAndNumber, city, email, phoneNumber} = this.state;
        return (
            <Container>
                <FormText className="text-danger"><h3>Muzej ID: {museumId}</h3></FormText>
                <FormText className="text-danger"><h3>Naziv: {name}</h3></FormText>
                <FormText className="text-danger"><h3>Ulica i broj: {streetAndNumber}</h3></FormText>
                <FormText className="text-danger"><h3>Grad: {city}</h3></FormText>
                <FormText className="text-danger"><h3>Email adresa: {email}</h3></FormText>
                <FormText className="text-danger"><h3>Kontakt telefon: {phoneNumber}</h3></FormText>
            </Container>
        );
    }
}
export default withRouter(MuseumDetails);