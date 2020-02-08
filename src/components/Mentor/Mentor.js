import React, {Component} from 'react';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../Header/Header.js';
import CurrentTrainings from '../CurrentTrainings/CurrentTrainings.js';
import CompletedTrainings from '../CompletedTrainings/CompletedTrainings.js';

class Mentor extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div class="mentor-container">
        <Header/>
        <div class="tabs-container">
          <Tabs>
            <TabList>
              <Tab>Current Trainings</Tab>
              <Tab>Edit Skills</Tab>
              <Tab>Completed Trainings</Tab>
              <Tab>Notifications</Tab>
            </TabList>

            <TabPanel>
              <CurrentTrainings/>
            </TabPanel>
            <TabPanel>
              <h5>Edit Skills</h5>
            </TabPanel>
            <TabPanel>
              <CompletedTrainings/>
            </TabPanel>
            <TabPanel>
              <h5>Notifications</h5>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Mentor;
