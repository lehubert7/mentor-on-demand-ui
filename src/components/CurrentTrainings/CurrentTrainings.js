import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import Header from '../Header/Header.js';
import './currenttrainings.css';
import {Constant} from '../../constants/AppConstants.js';

function mapStateToProps(state, props) {
    return {
      userId: state.userId
    };
}

class CurrentTrainings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inprogressTrainings: [],
      proposedTrainings: [],
      confirmedTrainings: [],
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
        this.fetchTrainings(Constant.INPROGRESS);
        this.fetchTrainings(Constant.PROPOSED);
        this.fetchTrainings(Constant.CONFIRMED);
      }
    );
  }


  fetchTrainings(status) {
    const {userId, userInfo} = this.state;
    var {inprogressTrainings, proposedTrainings, confirmedTrainings} = this.state;
    var uri = null;
    if(userInfo.usertype == Constant.SCHOLAR) {
      uri = '/training/scholar/' + userId + '/status/' + status;
    } else if (userInfo.usertype == Constant.MENTOR) {
      uri = '/training/mentor/' + userId + '/status/' + status;
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
          if(status == Constant.INPROGRESS) {
            inprogressTrainings.push(item);
          } else if (status == Constant.PROPOSED) {
            proposedTrainings.push(item);
          } else if (status == Constant.CONFIRMED) {
            confirmedTrainings.push(item);
          }
        });
        this.setState({inprogressTrainings: inprogressTrainings});
        this.setState({proposedTrainings: proposedTrainings});
        this.setState({confirmedTrainings: confirmedTrainings});
      }
    );
  }

  getTable(status) {
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
        {this.getTableBody(status)}
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

  getTableBody(status) {
    var rows = [];
    const {inprogressTrainings, proposedTrainings, confirmedTrainings} = this.state;
    const {userInfo} = this.state;
    var trainings = [];
    if(status == Constant.INPROGRESS) {
      trainings = inprogressTrainings;
    } else if (status == Constant.PROPOSED) {
      trainings = proposedTrainings;
    } else if (status == Constant.CONFIRMED) {
      trainings = confirmedTrainings;
    }
    for (const [index, value] of trainings.entries()) {
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
      <div class="current-trainings-container">
        <div class="inprogress-trainings">
          <h5>In-progress Trainings</h5>
          {this.getTable(Constant.INPROGRESS)}
        </div>
        <div class="confirmed-trainings">
          <h5>Confirmed Trainings</h5>
          {this.getTable(Constant.CONFIRMED)}
        </div>
        <div class="proposed-trainings">
          <h5>Proposed Trainings</h5>
          {this.getTable(Constant.PROPOSED)}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(CurrentTrainings);
