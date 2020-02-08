import React, {Component} from 'react';
import $ from 'jquery';
import Header from '../Header/Header.js';
import './completedtrainings.css';

class CompletedTrainings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedTrainings: [],
      scholar: 3
    };
    this.fetchTrainings();
  }

  fetchTrainings() {
    const {scholar} = this.state;
    var {completedTrainings} = this.state;
    const url = 'http://localhost:8080/mod/training/scholar/' + scholar + '/status/completed';
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
        {this.getTableBody()}
      </table>
    );
  }

  getTableBody() {
    var rows = [];
    const {completedTrainings} = this.state;

    for (const [index, value] of completedTrainings.entries()) {
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
      <div class="completed-trainings-container">
        <h5>Completed Trainings</h5>
        {this.getTable()}
      </div>
    );
  }
}
export default CompletedTrainings;
