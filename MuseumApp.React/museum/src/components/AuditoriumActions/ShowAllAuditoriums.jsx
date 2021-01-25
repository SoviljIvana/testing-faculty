import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';
import { Row, Table, Button } from 'react-bootstrap';
import Spinner from '../Spinner';

class ShowAllAuditoriums extends Component{
    constructor(props){
        super(props);
        this.state = {
            auditoriums: [],
            isLoading: true,
        }
        this.auditoriumDetails = this.auditoriumDetails.bind(this);
        this.removeAuditorium = this.removeAuditorium.bind(this);
        this.editAuditorium = this.editAuditorium.bind(this);
    }

    componentDidMount(){
      this.getAuditoriums();
    }

    getAuditoriums(){
        const requestOptions = {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
          };
            this.setState({isLoading: true});
            fetch(`${serviceConfig.baseURL}/api/Auditoriums/get`, requestOptions)
              .then(response => {
                if (!response.ok) {
                  return Promise.reject(response);
              }
              return response.json();
              })
              .then(data => {
                if (data) {
                  this.setState({ 
                      auditoriums: data,
                       isLoading: false });
                  }
              })
              .catch(response => {
                  NotificationManager.error(response.message || response.statusText);
                  this.setState({ isLoading: false });
              });
        }

        removeAuditorium(id) {
            const requestOptions = {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt')
              }
            
          };
      
          fetch(`${serviceConfig.baseURL}/api/auditoriums/delete/${id}`, requestOptions)
              .then(response => {
                  if (!response.ok) {
                      return Promise.reject(response);
                  }
                  return response.statusText;
              })
              .then(result => {
                  NotificationManager.success('Uspešno izbrisana sala koja ima id: '+ id);
                  const newState = this.state.auditoriums.filter(auditorium => {
                      return auditorium.id !== id;
                  })
                  this.setState({auditoriums: newState});
              })
              .catch(response => {
                  NotificationManager.error("Ne možete obrisati salu.");
                  this.setState({ submitted: false });
              });
          }

        fillTableWithDaata() {
            return this.state.auditoriums.map(auditorium => {
                return <tr key={auditorium.id}>
                    {/* <td>{auditorium.auditoriumId}</td>
                    <td>{auditorium.museumId}</td> */}
                    <td>{auditorium.nameOfAuditorium}</td>
                    <td>{auditorium.numberOfSeats}</td>
               <td>  <Button variant="dark" width = "1%" className="text-center cursor-pointer"  onClick={() => this.auditoriumDetails(auditorium.auditoriumId)}>vidi detalje</Button></td> 
               <td>  <Button variant="dark" width = "1%" className="text-center cursor-pointer"  onClick={() => this.editAuditorium(auditorium.auditoriumId)}>izmeni</Button></td> 
               <td>  <Button variant="dark" width = "1%" className="text-center cursor-pointer" onClick={() => this.removeAuditorium(auditorium.auditoriumId)}>obriši</Button> </td> 
  </tr>
        
        })
        }
        editAuditorium(id){
            this.props.history.push(`editAuditorium/${id}`);
        }

        auditoriumDetails(id){
            this.props.history.push(`auditoriumDetails/${id}`);
        }

        render(){
            const {isLoading} = this.state;
            const rowsData = this.fillTableWithDaata();
            const table = (<Table striped bordered hover responsive striped variant="dark">
                                <thead>
                                <tr>
                                {/* <th>ID</th> */}
                                {/* <th>MUZEJ ID</th> */}
                                <th>Naziv sale</th>
                                <th>Broj sedišta</th>
                                <th>Detalji</th>
                                <th>Izmena</th>
                                <th>Brisanje</th>
                                </tr>
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

export default ShowAllAuditoriums;