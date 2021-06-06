import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class StudentList extends Component {

  constructor(props) {
    super(props);
    this.state = { clients: [] };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    fetch('/student/')
      .then(response => response.json())
      .then(data => this.setState({ clients: data }));
  }

  async remove(id) {
    await fetch(`/student/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedClients = [...this.state.clients].filter(i => i.studentId !== id);
      this.setState({ clients: updatedClients });
    });
  }

  render() {
    const { clients } = this.state;

    const clientList = clients.map(client => {
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
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>

          <div className="container">
            <h3>Student List</h3>
            <Link to="/student/new"><Button variant="sm success">Create Student</Button></Link>
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
                {clientList}
              </tbody>
            </Table>
          </div>

        </Container>
      </div>
    );
  }
}

export default StudentList;