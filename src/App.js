import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentList from './StudentList';
import StudentEdit from "./StudentEdit";
import StudentSearch from "./StudentSearch";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/student' exact={true} component={StudentList}/>
            <Route path='/student/:id' component={StudentEdit}/>
            <Route path='/student/new' component={StudentEdit}/>
            <Route path='/search/student' component={StudentSearch}/>
          </Switch>
        </Router>
    )
  }
}

export default App;