import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, FormText} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig,  } from '../../AppSettings';

class AuditoriumDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            museumId: '',
            nameOfAuditorium: '',
            numberOfSeats : [],
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getAuditorium(id);
    }
    
    getAuditorium(id) {
        const requestOptions = {
            method: 'GET',
           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        };
        fetch(`${serviceConfig.baseURL}/api/auditoriums/get/${id}` , requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({
                        nameOfAuditorium: data.nameOfAuditorium,
                        numberOfSeats: data.numberOfSeats + '', 
                        auditoriumId: data.auditoriumId + '',
                        museumId: data.museumId
                    });
                }
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }

    render() {
        const {auditoriumId, museumId, nameOfAuditorium, numberOfSeats} = this.state;
        return (
            <Container>
                <FormText className="text-danger"><h3>Sala ID: {auditoriumId}</h3></FormText>
                <FormText className="text-danger"><h3>Muzej ID: {museumId}</h3></FormText>
                <FormText className="text-danger"><h3>Naziv sale: {nameOfAuditorium}</h3></FormText>
                <FormText className="text-danger"><h3>Broj sedišta: {numberOfSeats}</h3></FormText>
            </Container>
        );
    }
}
export default withRouter(AuditoriumDetails);
