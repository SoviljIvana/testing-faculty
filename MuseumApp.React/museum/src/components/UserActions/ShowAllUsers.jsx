import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../AppSettings';
import { Row, Table, Button } from 'react-bootstrap';
import Spinner from '../Spinner';

class ShowAllUsers extends Component{

    constructor(props){
        super(props);
        this.state = {
            users: [],
            isLoading: true,
        }
        this.userDetails = this.userDetails.bind(this); 
        this.editUser = this.editUser.bind(this);
    }

    componentDidMount(){
        this.getUsers();
    }

    getUsers(){
        const requestOptions = {
            method: 'GET' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
           };
            this.setState({isLoading: true});
            fetch(`${serviceConfig.baseURL}/api/Users/get`, requestOptions)
              .then(response => {
                if (!response.ok) {
                  return Promise.reject(response);
              }
              return response.json();
              })
              .then(data => {
                if (data) {
                  this.setState({ 
                      users: data,
                       isLoading: false });
                  }
              })
              .catch(response => {
                  NotificationManager.error(response.message || response.statusText);
                  this.setState({ isLoading: false });
              });
    }

  
    fillTableWithDaata() {
        return this.state.users.map(user => {
            return <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>  
                <td>{user.username}</td>  
                <td>{user.yearOfBirth}</td>  
                <td>{user.email}</td>    
                <td>  <Button  variant="dark"  width = "1%" className="text-center cursor-pointer" onClick = {() => this.userDetails(user.userId)}>vidi detalje</Button></td> 
                <td>  <Button variant="dark"  width = "1%" className="text-center cursor-pointer" onClick = {() => this.editUser(user.userId)}>izmeni</Button></td> 
</tr>
    })
    }

    editUser(id) {
        this.props.history.push(`edituser/${id}`);
    }

    userDetails(id){
        this.props.history.push(`userDetails/${id}`);
        }

    render(){
        const {isLoading} = this.state;
        const rowsData = this.fillTableWithDaata();
        const table = (<Table striped bordered hover responsive striped variant="dark">
                            <thead>
                            <th>Ime</th>
                            <th>Prezime</th>
                             <th>Korisničko ime</th>
                         
                            <th>Datum rođenja</th>
                            <th>Email adresa</th>
                            <th>Detalji</th>
                            <th>Izmena</th>
                          
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
export default ShowAllUsers;