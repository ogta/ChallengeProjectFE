import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class StudentEdit extends Component {

  emptyItem = {
    name: '',
    phoneNumber: '',
    identityNumber: '',
    townId: '',
    cityId: '',
    studentId: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      TownData: [],
      CityData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const client = await (await fetch(`/student/${this.props.match.params.id}`)).json();
      this.setState({ item: {
        name: client.name,
        phoneNumber: client.phoneNumber,
        identityNumber: client.identityNumber,
        townId : client.town.townId,
        cityId : client.city.cityId,
        studentId: client.studentId
      } });

      this.fetchCity();
      this.fetchTown(client.city.cityId);

    } else {
      this.fetchCity();
    }
  }

  fetchCity() {
    fetch('/city/')
      .then(response => response.json())
      .then(data => this.setState({ CityData: data }));
  }

  ChangeteStateCity = (e) => {
    this.fetchTown(e.target.value);
  }

  fetchTown(cityId) {
    fetch('/town/' + cityId)
      .then(response => response.json())
      .then(data => {
        const { item } = this.state;
        item.cityId = cityId;
        this.setState({ TownData: data, item })
      });
  }

  ChangeteStateTown = (e) => {
    const { item } = this.state;
    item.townId = e.target.value;
    this.setState({ item })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    await fetch('/student' + (item.studentId ? '/' + item.studentId : '/'), {
      method: (item.studentId) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    console.log(JSON.stringify(item));
    this.props.history.push('/student');
  }

  render() {
    const { item } = this.state;
    const title = <h2>{this.props.match.params.id !== 'new' ? 'Edit Student' : 'Create Student' }</h2>;

    return <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
              onChange={this.handleChange} autoComplete="name" />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input type="text" name="phoneNumber" id="phoneNumber" value={item.phoneNumber || ''}
              onChange={this.handleChange} autoComplete="phone" />
          </FormGroup>
          <FormGroup>
            <Label for="identityNumber">Identity Number</Label>
            <Input type="text" name="identityNumber" id="identityNumber" value={item.identityNumber || ''}
              onChange={this.handleChange} autoComplete="identityNumber" />
          </FormGroup>

          <div style={{ marginTop: '20px' }}>
            <select className="form-control" id="countryId" name="countryId" value={this.state.item.cityId} onChange={this.ChangeteStateCity}  >
              <option>Select City</option>
              {this.state.CityData.map((e, key) => {
                return <option selected = {e.cityId === this.state.item.cityId} key={e.name} value={e.cityId}>{e.name}</option>;
              })}
            </select>

            <select style={{ marginTop: '20px' }} id="townId" className="form-control" name="townId" value={this.state.item.townId} onChange={this.ChangeteStateTown}  >
              <option>Select Town</option>
              {this.state.TownData.map((e, key) => {
                return <option selected = {e.townId === this.state.item.townId} key={e.name} value={e.townId}>{e.name}</option>;
              })}
            </select>
          </div>

          <FormGroup style={{ marginTop: '30px' }} >
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/student">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(StudentEdit);