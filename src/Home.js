import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, CardBody, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="row">
                        <div className="col-lg-2">
                        <CardBody>
                                <Link to="/student"><Button variant="sm success">Student List</Button></Link>
                        </CardBody>
                        </div>
                        <div className="col-lg-2">
                        <CardBody>
                                <Link to="/student/new"><Button variant="sm success">Create Student</Button></Link>
                        </CardBody>
                        </div>

                        <div className="col-lg-2">
                        <CardBody>
                                <Link to="/search/student"><Button variant="sm success">Search Student</Button></Link>
                        </CardBody>
                        </div>
                    </div>
                    
                </Container>

                 
                
            </div>

        );
    }
}

export default Home;