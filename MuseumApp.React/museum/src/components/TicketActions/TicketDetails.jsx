import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, FormText} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig,  } from '../../AppSettings';

class TicketDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            payment: '',
            userId: '',
            exhibitionId: '',
          
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getTicket(id);
    }
    
    getTicket(id) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
           
        };
        fetch(`${serviceConfig.baseURL}/api/tickets/get/${id}` , requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({
                        ticketId: data.ticketId,
                        payment: data.payment + '',
                        userId: data.userId +'',
                        exhibitionId: data.exhibitionId +'',
                    });
                }
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }

    render() {
        const {ticketId, payment, userId, exhibitionId} = this.state;
        return (
            <Container>
                <FormText className="text-danger"><h3>ID KARTE: {ticketId}</h3></FormText>
                <FormText className="text-danger"><h3>PLACANJE: {payment}</h3></FormText>
                <FormText className="text-danger"><h3>ID KORISNIKA: {userId}</h3></FormText>
                <FormText className="text-danger"><h3>IZLOZBA ID: {exhibitionId}</h3></FormText>
            </Container>
        );
    }
}
export default withRouter(TicketDetails);