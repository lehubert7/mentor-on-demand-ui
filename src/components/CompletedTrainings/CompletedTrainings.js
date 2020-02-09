import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import Header from '../Header/Header.js';
import './completedtrainings.css';
import {Constant} from '../../constants/AppConstants.js';

function mapStateToProps(state, props) {
    return {
      userId: state.userId
    };
}

class CompletedTrainings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedTrainings: [],
      userInfo: {},
      userId: this.props.userId
    };

    this.getUserInfo();
  }

  getUserInfo() {
    const {userId, userInfo} = this.state;
    const url = Constant.BASE_URL + '/login/userinfo/' + userId;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
    .then(res => res.json())
    .then(
      (result) => {
        this.state.userInfo = result;
        this.setState({userInfo: result});
        this.fetchTrainings();
      }
    );
  }

  fetchTrainings() {
    const {userId, userInfo} = this.state;
    var {completedTrainings} = this.state;

    var uri = null;
    if(userInfo.usertype == Constant.SCHOLAR) {
      uri = '/training/scholar/' + userId + '/status/completed';
    } else if (userInfo.usertype == Constant.MENTOR) {
      uri = '/training/mentor/' + userId + '/status/completed';
    }
    const url = Constant.BASE_URL + uri;

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
    .then(res => res.json())
    .then(
      (result) => {
        result.map(function(item) {
          completedTrainings.push(item);
        });
        this.setState({completedTrainings: completedTrainings});
      }
    );
  }

  getTable() {
    return (
      <table>
        <col width="50"/>
        <col width="150"/>
        <col width="150"/>
        <col width="50"/>
        <col width="100"/>
        <col width="100"/>
        <col width="50"/>
        <thead>
          {this.getHeaders()}
        </thead>
        {this.getTableBody()}
      </table>
    );
  }

  getHeaders() {
    const {userInfo} = this.state;
    if(userInfo.usertype == Constant.SCHOLAR) {
      return (
        <tr>
          <th>Training ID</th>
          <th>Technology</th>
          <th>Mentor</th>
          <th>Progress</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
      );
    } else if (userInfo.usertype == Constant.MENTOR) {
      return (
        <tr>
          <th>Training ID</th>
          <th>Technology</th>
          <th>Scholar</th>
          <th>Progress</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
      );
    }
  }

  getTableBody() {
    var rows = [];
    const {completedTrainings} = this.state;
    const {userInfo} = this.state;
    for (const [index, value] of completedTrainings.entries()) {
      var person = null;
      if(userInfo.usertype == Constant.SCHOLAR) {
        person = value.mentor;
      } else if (userInfo.usertype == Constant.MENTOR) {
        person = value.scholar;
      }
      rows.push(
        <tr>
          <td>{value.id}</td>
          <td>{value.technology}</td>
          <td>{person}</td>
          <td>{value.progress}</td>
          <td>{value.startdate}</td>
          <td>{value.enddate}</td>
          <td>{value.status}</td>
        </tr>
      );
    }
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }


  render() {
    return (
      <div class="completed-trainings-container">
        <h5>Completed Trainings</h5>
        {this.getTable()}
      </div>
    );
  }
}
export default connect(mapStateToProps)(CompletedTrainings);
