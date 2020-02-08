import React, {Component} from 'react';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../Header/Header.js';
import './login.css';
import { Redirect } from 'react-router'
import Select from 'react-select';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      name: null,
      email: null,
      password: null,
      location: null,
      userInfo: {},
      redirect: {
        flag: false,
        path: ''
      },
      userTypes: [{
        label: 'Scholar',
        value: 'SCHOLAR'
      }, {
        label: 'Mentor',
        value: 'MENTOR'
      }],
      userType: {
        label: 'Scholar',
        value: 'SCHOLAR'
      }
    };
  }

  handleClick(action) {
    if(!this.validateInputs(action)) {
      //alert("Technology field is empty. Please select Technology from dropdown..");
      return;
    }
    if(action == 'login') {
      this.validateUser();
    } else if(action == 'register') {
      this.registerUser();
    }
  }

  validateUser() {
    const url = 'http://localhost:8080/mod/login/login';
    const {email, password, userInfo} = this.state;
    var query = {
      email: email,
      password: password
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query)
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.state.userInfo = result;
        this.setState({userInfo: result});
        this.routeUser();
      },
      (error) => {
        return false;
      }
    );
  }

  registerUser() {
    const url = 'http://localhost:8080/mod/login/register';
    const {name, email, password, location, userType, userInfo} = this.state;
    var query = {
      name: name,
      email: email,
      password: password,
      location: location,
      usertype: userType.value
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query)
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.state.userInfo = result;
        this.setState({userInfo: result});
        this.routeUser();
      },
      (error) => {
        return false;
      }
    );
  }

  routeUser() {
    const {userInfo, redirect} = this.state;
    if(userInfo) {
      if(userInfo.usertype == 'SCHOLAR') {
        redirect.flag = true;
        redirect.path = '/scholar';
      } else if(userInfo.usertype == 'MENTOR') {
        redirect.flag = true;
        redirect.path = '/mentor';
      } else if(userInfo.usertype == 'ADMIN') {
        redirect.flag = true;
        redirect.path = '/admin';
      }
    }
    this.setState({redirect: redirect});
  }

  validateInputs(action) {
    const {name, email, password, location} = this.state;
    if(!name && action == 'register')
      return false;
    if(!email)
      return false;
    if(email) {
      if(!(email.includes('.') && email.includes('@')))
        return false;
    }
    if(!password)
      return false;
    if(!location && action == 'register')
      return false;
    return true;
  }

  handleSelect = name => value => {
		this.setState({[name]: value });
	}

  handleEmailChange (e) {
    this.setState({email: e.target.value})
  }

  handleNameChange (e) {
    this.setState({name: e.target.value})
  }

  handlePasswordChange (e) {
    this.setState({password: e.target.value})
  }

  handleLocationChange (e) {
    this.setState({location: e.target.value})
  }

  getEmailElement() {
    return (
      <input type="text" class="form-control"
        placeholder="Email"
        value={this.state.email}
        onChange={this.handleEmailChange}/>
    );
  }

  getPasswordElement() {
    return (
      <input type="text" class="form-control"
        placeholder="Password"
        value={this.state.password}
        onChange={this.handlePasswordChange}/>
    );
  }

  getSubmitElement(action) {
    return (
      <div class="submit-button">
        <button type="button" class="btn btn-info"
          style={{padding: '10px 70px'}}
          onClick={() => this.handleClick(action)}>Submit</button>
      </div>
    );
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    const {redirect} = this.state;
    if(redirect.flag) {
      return (<Redirect to={redirect.path}/>);
    }
    return (
      <div class="login-container">
        <Header/>
        <div class="tabs-container">
          <Tabs>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>

            <TabPanel>
              <h5>Login</h5>
              <div class="login-form">
                {this.getEmailElement()}
                {this.getPasswordElement()}
                {this.getSubmitElement('login')}
              </div>
            </TabPanel>
            <TabPanel>
              <h5>Register</h5>
              <div class="register-form">
                <div class="usertype-element">
                  <Select
                    placeholder="User Type"
                    isSearchable={true}
                    isMulti={false}
                    autoFocus={false}
                    onChange={this.handleSelect('userType')}
                    options={this.state.userTypes}
                    value={this.state.userType}
                    name="userType"
                    maxMenuHeight={200}
                  />
                </div>
                <input type="text" class="form-control"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleNameChange}/>
                {this.getEmailElement()}
                {this.getPasswordElement()}
                <input type="text" class="form-control"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.handleLocationChange}/>
                {this.getSubmitElement('register')}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Login;
