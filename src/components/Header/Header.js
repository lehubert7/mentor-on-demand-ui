import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from "react-router-dom";
import './header.css';


class Header extends Component {
  constructor(props) {
    super(props);

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
          <Link to="/login">
            <button type="button" class="btn btn-primary"
              style={{padding: '10px 70px'}}
              >Login</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default Header;
