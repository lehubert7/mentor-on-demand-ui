import React, {Component} from 'react';
import $ from 'jquery';
import Header from '../Header/Header.js';
import './profile.css';


class Profile extends Component {
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
      <div class="profile-container">
        <Header/>
        <div class="profile-details">
          <h5>FName LName</h5>
          <p>FName.LName@xyz.com
          <br/>Location</p>
        </div>
      </div>
    );
  }
}
export default Profile;
