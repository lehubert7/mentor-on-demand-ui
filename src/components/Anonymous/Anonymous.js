import React, {Component} from 'react';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../Header/Header.js';
import SearchTrainings from '../SearchTrainings/SearchTrainings.js';

class Anonymous extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div class="anonymous-container">
        <Header/>
        <div class="tabs-container">
          <Tabs>
            <TabList>
              <Tab>Search Trainings</Tab>
            </TabList>

            <TabPanel>
              <SearchTrainings/>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Anonymous;
