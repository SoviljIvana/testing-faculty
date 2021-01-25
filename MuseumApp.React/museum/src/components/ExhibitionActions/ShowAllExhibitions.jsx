import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';
import { Row, Table, Button } from 'react-bootstrap';
import Spinner from '../Spinner';

class ShowAllExhibitions extends Component{
    constructor(props){
        super(props);
        this.state = {
            exhibitions: [],
            isLoading: true
        }
        
        this.exhibitionDetails = this.exhibitionDetails.bind(this);
        this.removeExhibition = this.removeExhibition.bind(this);
        this.editExhibition = this.editExhibition.bind(this);
    }

    componentDidMount(){
      this.getExhibitions();
    }

    getExhibitions(){
        const requestOptions = {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
            };
            this.setState({isLoading: true});
            fetch(`${serviceConfig.baseURL}/api/Exhibitions/get`, requestOptions)
              .then(response => {
                if (!response.ok) {
                  return Promise.reject(response);
              }
              return response.json();
              })
              .then(data => {
                if (data) {
                  this.setState({ 
                    exhibitions: data,
                       isLoading: false });
                  }
              })
              .catch(response => {
                  NotificationManager.error(response.message || response.statusText);
                  this.setState({ isLoading: false });
              });
        }

        removeExhibition(id) {
            const requestOptions = {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt')
              }
             
          };
      
          fetch(`${serviceConfig.baseURL}/api/exhibitions/delete/${id}`, requestOptions)
              .then(response => {
                  if (!response.ok) {
                      return Promise.reject(response);
                  }
                  return response.statusText;
              })
              .then(result => {
                  NotificationManager.success('Uspešno obrisana izložba sa id: '+ id);
                  const newState = this.state.exhibitions.filter(exhibition => {
                      return exhibition.id !== id;
                  })
                  this.setState({auditoriums: newState});
              })
              .catch(response => {
                  NotificationManager.error("Ne možete izbrisati izložbu.");
                  this.setState({ submitted: false });
              });
          }
    

        fillTableWithDaata() {
            return this.state.exhibitions.map(exhibition => {
                return <tr key={exhibition.id}>
                    <td>{exhibition.exhibitionName}</td>
                    <td>{exhibition.typeOfExhibition}</td>
                    <td>{exhibition.startTime}</td>
                    <td>{exhibition.endTime}</td>
                    <td>  <Button variant="dark"  width = "1%" className="text-center cursor-pointer"  onClick={() => this.exhibitionDetails(exhibition.exhibitionId)}>vidi detalje</Button></td> 
                         </tr>
            })
        }

        editExhibition(id){
            this.props.history.push(`editExhibition/${id}`);
        }
        
        exhibitionDetails(id){
            this.props.history.push(`exhibitionDetails/${id}`);
        }

        render(){
            const {isLoading} = this.state;
            const rowsData = this.fillTableWithDaata();
            const table = (<Table striped bordered hover responsive striped variant="dark">
                                <thead>
                                <th>Naziv</th>
                                <th>Vrsta izložbe</th>
                                <th>Datum otvaranja izložbe</th>
                                <th>Datum zatvaranja izložbe</th>
                                <th>Detalji</th>
                              
                                </thead>
                                <tbody>
                                    {rowsData}
                                </tbody>
                            </Table>);
            const showTable = isLoading ? <Spinner></Spinner> : table;
            return (
                <React.Fragment>
                    <Row >
                        {showTable}
                    </Row>
                </React.Fragment>
            );
        }
    }

export default ShowAllExhibitions;