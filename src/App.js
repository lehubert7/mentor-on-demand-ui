import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types'
import Login from './components/Login/Login.js';
import Anonymous from './components/Anonymous/Anonymous.js';
import Scholar from './components/Scholar/Scholar.js';
import Mentor from './components/Mentor/Mentor.js';
import Admin from './components/Admin/Admin.js';
import Profile from './components/Profile/Profile.js';

const App = ({ store }) => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Anonymous}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/scholar" component={Scholar}/>
        <Route exact path="/mentor" component={Mentor}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/profile" component={Profile}/>
      </Router>
    </Provider>
  </div>
);

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;
