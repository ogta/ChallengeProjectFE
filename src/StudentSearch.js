import React, { Component } from 'react';
import { Button, ButtonGroup, Label, Input, FormGroup, Container, Table, Alert } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class StudentSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      searchKey: '',
      searchValue: '',
      alertFlag: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.changeteSearchCriteria = this.changeteSearchCriteria.bind(this);
    this.searchStudent = this.searchStudent.bind(this);

  }

  searchStudent() {
    if (this.state.searchKey === '' || this.state.searchValue === ''){
      this.setState({alertFlag: true, clients: []});
    } else {
      fetch('/student/search/' + this.state.searchKey + "/" + this.state.searchValue)
      .then(response => response.status !== 204 ? response.json() : [])
      .then(data => this.setState({ clients: data }))
      .catch(err => console.log(err));
    }
  }

  changeteSearchCriteria = (e) => {
    this.setState({ searchKey: e.target.value });
  }

  handleChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  render() {
    const isAlertExist = this.state.alertFlag;
    let alert = '';
    if (isAlertExist) {
      alert = <Alert color="danger">Search Criteria is required!</Alert>
    }
    return (
      <div>
        <AppNavbar />
        <Container fluid>

          <div className="container">
            {alert}
            <h3>Search Student</h3>
            <div className='row'>
              <div className='col-lg-6'>
                <select style={{ marginTop: '20px' }} className="form-control" name="key" onChange={this.changeteSearchCriteria}  >
                <option value="">Select Criteria</option>
                  <option value="NAME">Name</option>
                  <option value="IDENTITY_NUMBER">Identity Number</option>
                  <option value="PHONE">Phone</option>
                  <option value="CITY">City</option>
                  <option value="TOWN">Town</option>
                </select>
              </div>
              <div className='col-lg-6'>
                <FormGroup>
                  <Label for="phone">Value</Label>
                  <Input type="text" name="phoneNumber" id="phoneNumber" onChange={this.handleChange} />
                </FormGroup>
              </div>
            </div>


            <div style={{ marginTop: '30px' }}>
              <Button onClick={this.searchStudent} className="btn btn-success">Search Student</Button>
            </div>
            <Table className="mt-4">
              <thead>
                <tr>
                  <th width="30%">Name</th>
                  <th width="30%">Identity Number</th>
                  <th width="">Phone</th>
                  <th width="">City</th>
                  <th width="">Town</th>
                  <th width=""></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.clients.map(client => {
                    return <tr key={client.studentId}>
                      <td style={{ whiteSpace: 'nowrap' }}>{client.name}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{client.identityNumber}</td>
                      <td>{client.phoneNumber}</td>
                      <td>{client.city.name}</td>
                      <td>{client.town.name}</td>
                      <td>
                        <ButtonGroup>
                          <Button size="sm" color="primary" tag={Link} to={"/student/" + client.studentId}>Edit</Button>
                          <Button size="sm" style={{ marginLeft: '3px' }} color="danger" onClick={() => this.remove(client.studentId)}>Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
          </div>

        </Container>
      </div >
    );
  }
}

export default StudentSearch;