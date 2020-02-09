import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import { Redirect } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../Header/Header.js';

function mapStateToProps(state, props) {
    return {
      userId: state.userId
    };
}

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: {
        flag: false,
        path: '/login'
      }
    };
    if(!this.props.userId) {
      this.state.redirect.flag = true;
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    const {redirect} = this.state;
    if(redirect.flag) {
      return (<Redirect to={redirect.path}/>);
    }
    return (
      <div class="admin-container">
        <Header/>
        <div class="tabs-container">
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Admin);
