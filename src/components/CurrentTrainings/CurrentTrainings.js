import React, {Component} from 'react';
import $ from 'jquery';
import Header from '../Header/Header.js';
import './currenttrainings.css';

class CurrentTrainings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inprogressTrainings: [],
      proposedTrainings: [],
      confirmedTrainings: [],
      scholar: 3
    };
    this.fetchTrainings('inprogress');
    this.fetchTrainings('proposed');
    this.fetchTrainings('confirmed');
  }

  fetchTrainings(status) {
    const {scholar} = this.state;
    var {inprogressTrainings, proposedTrainings, confirmedTrainings} = this.state;
    const url = 'http://localhost:8080/mod/training/scholar/' + scholar + '/status/' + status;
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
          if(status == 'inprogress') {
            inprogressTrainings.push(item);
          } else if (status == 'proposed') {
            proposedTrainings.push(item);
          } else if (status == 'confirmed') {
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
          <tr>
            <th>Training ID</th>
            <th>Technology</th>
            <th>Mentor</th>
            <th>Progress</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        {this.getTableBody(status)}
      </table>
    );
  }

  getTableBody(status) {
    var rows = [];
    const {inprogressTrainings, proposedTrainings, confirmedTrainings} = this.state;
    var trainings = [];
    if(status == 'inprogress') {
      trainings = inprogressTrainings;
    } else if (status == 'proposed') {
      trainings = proposedTrainings;
    } else if (status == 'confirmed') {
      trainings = confirmedTrainings;
    }
    for (const [index, value] of trainings.entries()) {
      rows.push(
        <tr>
          <td>{value.id}</td>
          <td>{value.technology}</td>
          <td>{value.mentor}</td>
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
          {this.getTable('inprogress')}
        </div>
        <div class="confirmed-trainings">
          <h5>Confirmed Trainings</h5>
          {this.getTable('confirmed')}
        </div>
        <div class="proposed-trainings">
          <h5>Proposed Trainings</h5>
          {this.getTable('proposed')}
        </div>
      </div>
    );
  }
}
export default CurrentTrainings;
