import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';
import { Row, Table, Button } from 'react-bootstrap';
import Spinner from '../Spinner';

class ShowAllMuseums extends Component{
    constructor(props){
        super(props);
        this.state = {
            museums: [],
            isLoading: true
        }
        this.museumDetails = this.museumDetails.bind(this);
        this.removeMuseum = this.removeMuseum.bind(this);
        this.editMuseum = this.editMuseum.bind(this);
    }

    componentDidMount(){
      this.getMuseums();
    }

    getMuseums(){
        const requestOptions = {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
          };
            this.setState({isLoading: true});
            fetch(`${serviceConfig.baseURL}/api/Museums/get`, requestOptions)
              .then(response => {
                if (!response.ok) {
                  return Promise.reject(response);
              }
              return response.json();
              })
              .then(data => {
                if (data) {
                  this.setState({ 
                      museums: data,
                       isLoading: false });
                  }
              })
              .catch(response => {
                  NotificationManager.error(response.message || response.statusText);
                  this.setState({ isLoading: false });
              });
        }
        removeMuseum(id) {
            const requestOptions = {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt')
              }
             
          };
      
          fetch(`${serviceConfig.baseURL}/api/museums/delete/${id}`, requestOptions)
              .then(response => {
                  if (!response.ok) {
                      return Promise.reject(response);
                  }
                  return response.statusText;
              })
              .then(result => {
                  NotificationManager.success('Uspešno izbrisan muzej sa id: '+ id);
                  const newState = this.state.museums.filter(museum => {
                      return museum.id !== id;
                  })
                  this.setState({auditoriums: newState});
              })
              .catch(response => {
                  NotificationManager.error("Ne možete izbrisati muzej.");
                  this.setState({ submitted: false });
              });
          }
    
        fillTableWithDaata() {
            return this.state.museums.map(museum => {
                return <tr key={museum.id}>
                    <td>{museum.name}</td>
                    <td>{museum.streetAndNumber}</td>
                    <td>{museum.city}</td>
                    <td>{museum.email}</td>
                    <td>{museum.phoneNumber}</td>
                    <td>  <Button variant="dark"  width = "1%" className="text-center cursor-pointer"  onClick={() => this.museumDetails(museum.museumId)}>vidi detalje</Button></td> 
                    <td> <Button variant="dark"  width = "1%" className="text-center cursor-pointer" onClick={() => this.editMuseum(museum.museumId)}>izmeni</Button></td> 
                   <td><Button variant="dark"  width = "1%" className="text-center cursor-pointer" onClick={() => this.removeMuseum(museum.museumId)}>obriši</Button> </td> 
                            </tr>
            })
        }

        editMuseum(id){
            this.props.history.push(`editMuseum/${id}`);
        }
        museumDetails(id){
            this.props.history.push(`museumDetails/${id}`);
        }
        render(){
            const {isLoading} = this.state;
            const rowsData = this.fillTableWithDaata();
            const table = (<Table striped bordered hover responsive striped variant="dark">
                                <thead>
                                <th>Naziv</th>
                                <th>Ulica i broj</th>
                                <th>Grad</th>
                                <th>E-mail adresa</th>
                                <th>Telefon</th>
                                <th>Detalji</th>
                                <th>Izmena</th>
                                <th>Brisanje</th>
                                </thead>
                                <tbody>
                                    {rowsData}
                                </tbody>
                            </Table>);
            const showTable = isLoading ? <Spinner></Spinner> : table;
            return (
                <React.Fragment>
                    <Row>
                        {showTable}
                    </Row>
                </React.Fragment>
            );
        }
    }

export default ShowAllMuseums;