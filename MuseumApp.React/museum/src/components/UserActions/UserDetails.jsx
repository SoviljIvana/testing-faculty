import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, FormText} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig,  } from '../../AppSettings';

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            yearOfBirth: '',
            email:'',
          
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getUser(id);
    }
    
    getUser(id) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
           
        };
        fetch(`${serviceConfig.baseURL}/api/users/get/${id}` , requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({
                        userId: data.userId,
                        firstName: data.firstName + '',
                        lastName: data.lastName +'',
                        username: data.username +'',
                        password: data.password + '',
                        yearOfBirth: data.yearOfBirth + '',
                        email: data.email+ '',
                    });
                }
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }

    render() {
        const {userId, firstName, lastName, username, password, yearOfBirth, email} = this.state;
        return (
            <Container>
                <FormText className="text-danger"><h3>ID KORISNIKA: {userId}</h3></FormText>
                <FormText className="text-danger"><h3>IME: {firstName}</h3></FormText>
                <FormText className="text-danger"><h3>PREZIME: {lastName}</h3></FormText>
                <FormText className="text-danger"><h3>KORISNICKO IME: {username}</h3></FormText>
                <FormText className="text-danger"><h3>LOZINKA: {password}</h3></FormText>
                <FormText className="text-danger"><h3>DATUM RODJENJA: {yearOfBirth}</h3></FormText>
                <FormText className="text-danger"><h3>EMAIL: {email}</h3></FormText>

 
 
            </Container>
        );
    }
}
export default withRouter(UserDetails);