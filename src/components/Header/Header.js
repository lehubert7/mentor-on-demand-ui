import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from "react-router-dom";
import './header.css';
import {connect} from 'react-redux';
import {setUserId} from '../../store/action.js';

function mapStateToProps(state, props) {
    return {
      userId: state.userId
    };
}

const mapDispatchToProps = dispatch => ({
  setUserId: userId => {
    dispatch(setUserId(userId));
  },
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  getLogonButtons() {
    if(this.props.userId) {
      return (
        <Link to="/">
          <button type="button" class="btn btn-primary"
            style={{padding: '10px 70px'}}
            onClick={this.handleClick}
            >Logoff</button>
        </Link>
      );
    } else {
      return (
        <Link to="/login">
          <button type="button" class="btn btn-primary"
            style={{padding: '10px 70px'}}
            >Login</button>
        </Link>
      );
    }
  }

  handleClick(e) {
    this.props.setUserId(null);
  }
  
  componentDidMount() {
  }

  componentDidUpdate() {
  }


  render() {
    return (
      <div class="header-container">
        <h2>Mentor On Demand</h2>
        <div class="pull-right">
          {this.getLogonButtons()}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
