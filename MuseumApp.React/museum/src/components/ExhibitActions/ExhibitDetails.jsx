import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, FormText} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig,  } from '../../AppSettings';

class ExhibitDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            year: '',
            picturePath : '',
            auditoriumId : '',
            exhibitionId : ''
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getExhibit(id);
    }
    
    getExhibit(id) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
       
        };
        fetch(`${serviceConfig.baseURL}/api/exhibits/get/${id}` , requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({
                        exhibitId: data.exhibitId,
                        name: data.name + '', 
                        year: data.year + '',
                        picturePath: data.picturePath + '',
                        auditoriumId : data.auditoriumId ,
                        exhibitionId : data.exhibitionId,
                    });
                }
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }

    render() {
        const {exhibitId, name, year, picturePath, auditoriumId, exhibitionId} = this.state;
        return (
            <Container>
                <FormText className="text-danger"><h3>IZLOŽBA ID: {exhibitId}</h3></FormText>
                <FormText className="text-danger"><h3>IME: {name}</h3></FormText>
                <FormText className="text-danger"><h3>GODINA: {year}</h3></FormText>
                <FormText className="text-danger"><h3>SLIKA: {picturePath}</h3></FormText>
                <FormText className="text-danger"><h3>SALA ID: {auditoriumId}</h3></FormText>
                <FormText className="text-danger"><h3>IZLOŽBA ID: {exhibitionId}</h3></FormText>
            </Container>
        );
    }
}
export default withRouter(ExhibitDetails);