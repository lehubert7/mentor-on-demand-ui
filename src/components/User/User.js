import React, {Component} from 'react';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../Header/Header.js';

class User extends Component {
  constructor(props) {
    super(props);

  }




  componentDidMount() {
  }

  componentDidUpdate() {
  }


  render() {
    return (
      <div class="user-container">
        <Header/>
        <div class="tabs-container">
          <Tabs>
            <TabList>
              <Tab>Current Trainings</Tab>
              <Tab>Search Trainings</Tab>
              <Tab>Completed Trainings</Tab>
              <Tab>Notifications</Tab>
            </TabList>

            <TabPanel>
              <h2>Current Trainings</h2>
            </TabPanel>
            <TabPanel>
              <h2>Search Trainings</h2>
            </TabPanel>
            <TabPanel>
              <h2>Completed Trainings</h2>
            </TabPanel>
            <TabPanel>
              <h2>Notifications</h2>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default User;
