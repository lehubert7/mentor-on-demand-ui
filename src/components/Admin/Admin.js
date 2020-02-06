import React, {Component} from 'react';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../Header/Header.js';


class Admin extends Component {
  constructor(props) {
    super(props);

  }




  componentDidMount() {
  }

  componentDidUpdate() {
  }


  render() {
    return (
      <div class="admin-container">
        <Header/>
        <div class="tabs-container">
        </div>
      </div>
    );
  }
}
export default Admin;
