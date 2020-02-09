import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './searchTrainings.css';
import Select from 'react-select';
import DateRangePicker from 'react-daterange-picker';
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import {Link} from "react-router-dom";
import {Constant} from '../../constants/AppConstants.js';

function mapStateToProps(state, props) {
    return {
      userId: state.userId
    };
}

class SearchTrainings extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.proposeTraining = this.proposeTraining.bind(this);

    const moment = extendMoment(originalMoment);
    const today = moment();

    this.state = {
      technologyOptions: [],
      technology: null,
      mentorInfos: [],
      trainingData: {},
      disablePropose: false,
      daterange: moment.range(today.clone().add(1, "days"), today.clone().add(1, "days"))
    };

    if(!this.props.userId) {
      this.state.disablePropose = true;
    }

    this.fetchTechnologies();
  }

  fetchTechnologies() {
    const url = Constant.BASE_URL + '/technology/all';
    const {technologyOptions} = this.state;
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
          var option = {
            label: item.name,
            value: item.id
          };
          technologyOptions.push(option);
        });
      }
    );
  }

  fetchTrainings(query) {
    const url = Constant.BASE_URL + '/trainsearch/mentor';
    const {mentorInfos} = this.state;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query)
    })
    .then(res => res.json())
    .then(
      (result) => {
        result.map(function(item) {
          mentorInfos.push(item);
        });
        this.setState({mentorInfos: mentorInfos});
      }
    );
  }

  performSearch () {
    const {technology, daterange} = this.state;
    if(!this.validateInputs()) {
      //alert("Technology field is empty. Please select Technology from dropdown..");
      return;
    }

    var query = {
      technology: technology.value,
      startdate: daterange.start,
      enddate: daterange.end,
      scholar: this.props.userId
    };
    this.state.mentorInfos = [];
    this.fetchTrainings(query);
    window.scrollBy(0, 700);
  }

  getProposeElement(proposed, id) {
    const {mentorInfos, disablePropose} = this.state;
    if(proposed) {
      return (<p>Proposed</p>);
    } else {
      return (
        <button
          type="button"
          class="btn btn-warning"
          disabled={disablePropose}
          id={id}
          onClick={(e) => this.proposeTraining(e, id)}>Propose</button>
      );
    }
  }

  proposeTraining(e, id) {
    const {mentorInfos, technology, daterange, trainingData} = this.state;
    var startdate = daterange.start.toDate();
    var enddate = daterange.end.toDate();
    for(const [index, value] of mentorInfos.entries()) {
      if(value.id == id) {
        trainingData.scholarId = this.props.userId;
        trainingData.mentorId = value.mentor;
        trainingData.technologyId = technology.value;
        trainingData.startdate = startdate;
        trainingData.enddate = enddate;
        this.postTrainingRequest();
      }
    }
  }

  postTrainingRequest() {
    const {trainingData, mentorInfos} = this.state;
    alert(JSON.stringify(trainingData));
    const url = Constant.BASE_URL + '/training/add';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainingData)
    })
    .then(res => res.json())
    .then(
      (result) => {
        for(const [index, value] of mentorInfos.entries()) {
          if(value.mentor == trainingData.mentorId) {
            value.proposed = true;
          }
        }
        this.setState({mentorInfos: mentorInfos});
      }
    );
  }

  getResultTableBody() {
    var rows = [];
    const {mentorInfos, technology, daterange} = this.state;
    var startdate = daterange.start.toDate();
    var enddate = daterange.end.toDate();

    for (const [index, value] of mentorInfos.entries()) {
      var sNo = index + 1;
      rows.push(
        <tr>
          <td>{sNo}</td>
          <td>
            <Link
              to={{
                pathname: '/profile',
                state: {
                  technology: technology,
                  startdate: startdate,
                  enddate: enddate,
                  userid: value.id,
                  mentorInfo: null
                }
              }}
            >{value.name}</Link>
          </td>
          <td>{value.experience}</td>
          <td>{value.noOfTrainings}</td>
          <td>{value.fee}</td>
          <td>{value.technology}</td>
          <td>{this.getProposeElement(value.proposed, value.id)}</td>
        </tr>
      );
    }
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }

  validateInputs() {
    const {technology, daterange} = this.state;
    if(!technology || !technology.value)
      return false;
    return true;
  }

  handleSelect = name => value => {
		this.setState({[name]: value });
	}

  onDateSelect = (daterange, states) => {
    this.setState({ daterange, states });
  };

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    const {technology, technologyOptions} = this.state;

    return (
      <div class="search-trainings-container">
        <h5>Search Trainings</h5>
        <div class="technology-container">
          <Select
    				placeholder="Select a technology"
    				isSearchable={true}
    				isMulti={false}
    				autoFocus={false}
    				onChange={this.handleSelect('technology')}
    				options={technologyOptions}
    				value={technology}
    				name="technology"
    				maxMenuHeight={200}
    			/>
        </div>
        <div class="timeframe-container">
          <span class="label label-primary">Select Dates</span>
          <DateRangePicker
            locale='en'
            numberOfCalendars={2}
            selectionType="range"
            minimumDate={new Date()}
            value={this.state.daterange}
            onSelect={this.onDateSelect}
          />
          <div class="row">
            <input disabled type="text" class="form-control"
              placeholder="From date"
              value={this.state.daterange.start.format("DD-MM-YYYY")}/>
            <input disabled type="text" class="form-control"
              placeholder="To date" style={{marginLeft: '70px'}}
              value={this.state.daterange.end.format("DD-MM-YYYY")}/>
          </div>
        </div>
        <div class="search-button">
          <button
            type="button"
            class="btn btn-info"
            style={{padding: '10px 70px'}}
            onClick={this.performSearch}
          >Search</button>
        </div>
        <div class="search-result">
          <table>
            <col width="50"/>
            <col width="200"/>
            <col width="120"/>
            <col width="120"/>
            <col width="120"/>
            <col width="200"/>
            <col width="100"/>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Experience</th>
                <th>No of Trainings delivered</th>
                <th>Fee charged</th>
                <th>Technology</th>
                <th>Action</th>
              </tr>
            </thead>
            {this.getResultTableBody()}
          </table>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SearchTrainings);
