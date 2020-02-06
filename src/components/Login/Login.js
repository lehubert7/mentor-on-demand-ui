import React, {Component} from 'react';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../Header/Header.js';
import './login.css';


class Login extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);


    this.state = {
      name: null,
      email: null,
      password: null
    };
  }

  handleClick(action) {
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
                <input type="text" class="form-control"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleNameChange}/>
                {this.getEmailElement()}
                {this.getPasswordElement()}
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
