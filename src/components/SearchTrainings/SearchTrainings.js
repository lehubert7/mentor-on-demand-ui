import React, {Component} from 'react';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './searchTrainings.css';
import Select from 'react-select';
import DateRangePicker from 'react-daterange-picker';
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

class SearchTrainings extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);

    const today = moment();

    this.state = {
      options: [{
        value: 'dev_v3a',
        label: '3.0 E1'  }, {
        value: 'test_v3a',
        label: '3.0 E2'
      }],
      technology: null,
      daterange: moment.range(today.clone().subtract(0, "days"), today.clone())
    };

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
    const {technology, options} = this.state;

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
    				options={options}
    				value={technology}
    				name="technology"
    				maxMenuHeight={200}
    			/>
        </div>
        <div class="timeframe-container">
          <span class="label label-primary">Select a timeframe</span>
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
          <button type="button" class="btn btn-info" style={{padding: '10px 70px'}}>Search</button>
        </div>
      </div>
    );
  }
}
export default SearchTrainings;
