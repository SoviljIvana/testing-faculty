import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormControl, Button, Container, Row, Col, FormText, } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';

class EditExhibit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            name: '',
            year: 0,
            picturePath: '',
            exhibitId: 0,
            exhibitionId: 0,
            auditoriumId: 0,            
            submitted: false,
            canSubmit: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params; 
        this.getExhibit(id);
    }
    getExhibit(exhibitId) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
          
        };
    
        fetch(`${serviceConfig.baseURL}/api/exhibits/get/` + exhibitId, requestOptions)
            .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({picturePath: data.picturePath,
                        exhibitId: data.exhibitId,
                        exhibitionId: data.exhibitionId,
                        auditoriumId: data.auditoriumId,
                        year: data.year,
                        name: data.name,
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
        const {auditoriumId, exhibitionId, exhibitId, name, year, picturePath} = this.state;
        if (auditoriumId && exhibitionId && exhibitId && name && year && picturePath) {
            this.updateExhibit();
        } else {
            NotificationManager.error('Molim vas popunite polje.');
            this.setState({ submitted: false });
        }
    }
 
    updateExhibit() {

        const {auditoriumId, exhibitionId, exhibitId, name, year, picturePath} = this.state;
        const data = {
            auditoriumId: auditoriumId,
            exhibitionId: exhibitionId,
            exhibitIdv: exhibitId, 
            name: name,
            year: +year,
            picturePath: picturePath
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
        
        fetch(`${serviceConfig.baseURL}/api/exhibits/put/${exhibitId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(data => {
                if(data){
                    this.setState({
                        name : data.name,
                        year: data.year,
                        picturePath: data.picturePath
                    });
                }
            })
            .then(result => {
                this.props.history.goBack();
                NotificationManager.success('Uspešno izmenjen eksponat!');
            })
            .catch(response => {
                NotificationManager.error("Ne možete izmeniti podatke o eksponatu. ");
                this.setState({ submitted: false });
            });
    }

    render() {
        const {name, year, picturePath, canSubmit , submitted} = this.state;
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
                                
                                    id="year"
                                    type="number"
                                    placeholder="godina"
                                    value={year}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    id="picturePath"
                                    type="text"
                                    placeholder="putanja do slike"
                                    value={picturePath}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                           
                            <Button  variant="danger" type="submit" disabled={submitted || !canSubmit} block>Izmeni eksponat</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(EditExhibit);