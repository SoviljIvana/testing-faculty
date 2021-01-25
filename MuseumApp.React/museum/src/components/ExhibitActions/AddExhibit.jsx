import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormControl, Button, Container, Row, Col, FormText, } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';
import { YearPicker } from 'react-dropdown-date';

class AddExhibit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exhibitId: 0,
            exhibitionId: 0,
            name: '',
            year: 0,
            picturePath: '',
            auditoriumId: 0,
            nameError: '',
            submitted: false,
            canSubmit: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
    }

    
    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
        this.validate(id, value);

    }

    validate(id, value) {
        if (id === 'name') {
            if (value === '') {
                this.setState({nameError: 'Unesite naziv.',
                                canSubmit: false});
            } else {
                this.setState({nameError: '',
                                canSubmit: true});
            }
        }

        if(id === 'year') {
            const yearNum = +value;
            if(!value || value === '' || (yearNum<1895 || yearNum>2100)){
                this.setState({yearError: 'Molim vas unesite validnu godinu.'});
            } else {
                this.setState({yearError: ''});
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, year, picturePath} = this.state;
        if (name && year && picturePath ) {
            this.newExhibit();
        } else {
            NotificationManager.error('Unesite podatak.');
            this.setState({ submitted: false });
        }
    }

    handleYearChange(year) {
        this.setState({year: year});
        this.validate('year', year);
    }

    newExhibit() {
        const { exhibitId,exhibitionId, name, year, picturePath, auditoriumId} = this.state;

        const data = {
            ExhibitId: +exhibitId,
            ExhibitionId: +exhibitionId,
            Name: name,
            Year: +year,
            picturePath : picturePath,
            auditoriumId: +auditoriumId,
           
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify(data)
        };

        fetch(`${serviceConfig.baseURL}/api/exhibits/post`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(result => {
                NotificationManager.success('Uspešno dodat eksponat!');
                this.props.history.push(`ShowAllExhibits`);
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }
    

    render() {
        const {exhibitId, name, year, picturePath, exhibitionId, auditoriumId,  submitted, nameError, yearError, canSubmit } = this.state;
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
                                <FormText className="text-danger">{nameError}</FormText>
                            </FormGroup>
                            <FormGroup>
                                <YearPicker
                                    defaultValue={'Select Year'}
                                    start={1895}
                                    end={2100}
                                    reverse
                                    required={true}
                                    disabled={false}
                                    value={year}
                                    onChange={(year) => {
                                        this.handleYearChange(year);
                                    }}
                                    id={'year'}
                                    name={'year'}
                                    classes={'form-control'}
                                    optionClasses={'option classes'}
                                />
                                <FormText className="text-danger">{yearError}</FormText>
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
                            <FormGroup>
                                <FormControl
                                    id="exhibitionId"
                                    type="number"
                                    placeholder="id izložbe"
                                    value={exhibitionId}
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
                            <FormGroup>
                                <FormControl
                                    id="exhibitId"
                                    type="number"
                                    placeholder="id eksponata"
                                    value={exhibitId}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button  variant="info" type="submit" disabled={submitted || !canSubmit} block>Dodaj eksponat</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(AddExhibit);