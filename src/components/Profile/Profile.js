import React, {Component} from 'react';
import $ from 'jquery';
import Header from '../Header/Header.js';
import './profile.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.oldState = props.location.state;
    this.state = {
      mentorInfo: {},
      mentorSkills:[]
    };
    this.fetchProfileInfo();
    this.fetchSkillsInfo();
  }

  fetchProfileInfo() {
    const {userid} = this.oldState;
    var {mentorInfo} = this.state;
    const url = 'http://localhost:8080/mod/profile/mentor/' + userid;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
    .then(res => res.json())
    .then(
      (result) => {
        this.state.mentorInfo = result;
        this.setState({mentorInfo: result});
      }
    );
  }

  fetchSkillsInfo() {
    const {userid} = this.oldState;
    var {mentorSkills} = this.state;
    const url = 'http://localhost:8080/mod/mentorskills/summary/' + userid;
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
          mentorSkills.push(item);
        });
        this.setState({mentorSkills: mentorSkills});
      }
    );
  }

  getSkillsTableBody() {
    var rows = [];
    const {mentorSkills} = this.state;

    for (const [index, value] of mentorSkills.entries()) {
      rows.push(
        <tr>
          <td>{value.technology}</td>
          <td>{value.experience}</td>
          <td>{value.noOfTrainings}</td>
          <td>{value.fee}</td>
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
    const {mentorInfo} = this.state;
    var skills = mentorInfo.skills + '';
    skills = skills.replace(',',', ');
    return (
      <div class="profile-container">
        <Header/>
        <div class="tabs-container">
          <Tabs>
            <TabList>
              <Tab>Profile</Tab>
            </TabList>

            <TabPanel>
              <div class="profile-details">
                <table>
                  <col width="200"/>
                  <col width="500"/>
                  <tbody>
                    <tr>
                      <td><small>Name</small></td>
                      <td>{mentorInfo.name}</td>
                    </tr>
                    <tr>
                      <td><small>Designation</small></td>
                      <td>{mentorInfo.designation}</td>
                    </tr>
                    <tr>
                      <td><small>Skills</small></td>
                      <td>{skills}</td>
                    </tr>
                    <tr>
                      <td><small>Email</small></td>
                      <td>{mentorInfo.email}</td>
                    </tr>
                    <tr>
                      <td><small>Location</small></td>
                      <td>{mentorInfo.location}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="skill-summary">
                  <h5>Experience</h5>
                  <table>
                    <col width="200"/>
                    <col width="200"/>
                    <col width="200"/>
                    <col width="200"/>
                    <thead>
                      <tr>
                        <th>Technology</th>
                        <th>Experience</th>
                        <th>No of Trainings delivered</th>
                        <th>Fee charged</th>
                      </tr>
                    </thead>
                    {this.getSkillsTableBody()}
                  </table>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Profile;
