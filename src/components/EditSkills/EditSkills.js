import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import Header from '../Header/Header.js';
import './editSkills.css';
import {Constant} from '../../constants/AppConstants.js';
import Select from 'react-select';

function mapStateToProps(state, props) {
    return {
      userId: state.userId
    };
}

class EditSkills extends Component {
  constructor(props) {
    super(props);

    this.enableEdit = this.enableEdit.bind(this);
    this.saveSkills = this.saveSkills.bind(this);
    this.handleExperienceChange = this.handleExperienceChange.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      mentorSkills: [],
      userInfo: {},
      userId: this.props.userId,
      editFlag: [],
      technologyOptions: [],
      technology: null,
      experience: null
    };

    this.getUserInfo();
    this.fetchTechnologies();
  }

  getUserInfo() {
    const {userId, userInfo} = this.state;
    const url = Constant.BASE_URL + '/login/userinfo/' + userId;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
    .then(res => res.json())
    .then(
      (result) => {
        this.state.userInfo = result;
        this.setState({userInfo: result});
        this.fetchSkillsInfo();
      }
    );
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

  fetchSkillsInfo() {
    const {userId, mentorSkills} = this.state;
    const url = Constant.BASE_URL + '/mentorskills/summary/' + userId;
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

  saveSkills() {
    var {editFlag} = this.state;
    const {mentorSkills} = this.state;
    for (const [index, value] of mentorSkills.entries()) {
      this.postSkill(value);
    }

    editFlag = [];
    this.setState({editFlag: editFlag});
  }

  postSkill(skill) {
    const url = Constant.BASE_URL + '/mentorskills/add';
    const {mentorSkills} = this.state;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skill)
    })
    .then(res => res.json())
    .then(
      (result) => {
        return true;
      },
      (error) => {
        return false;
      }
    );
  }

  enableEdit(e, index, id) {
    const {editFlag} = this.state;
    editFlag[index] = true;
    this.setState({editFlag: editFlag});
  }

  getExperienceElement(value, index, id) {
    var {editFlag} = this.state;
    if(!value) {
      value = 0;
    }
    if(editFlag[index] == true) {
      return (
          <input type='text' value={value} onChange={(e) => this.handleChange(e, index, id)}/>

      );
    } else {
      return (<p>{value} years</p>);
    }
  }

  validateInputs() {
    const {technology, experience} = this.state;
    if(!technology || !technology.value)
      return false;
    if(!experience)
      return false;

    return true;
  }

  addSkill(e) {
    const {mentorSkills, userId, technology, experience} = this.state;
    if(this.validateInputs()) {
      var skill = {
        mentor: userId,
        technologyId: technology.value,
        technology: technology.label,
        experience: experience,
        status: 'approved'
      };
      mentorSkills.push(skill);
    }
    this.setState({mentorSkills: mentorSkills});
  }

  handleExperienceChange(e) {
    this.setState({experience: e.target.value})
  }

  handleChange(e, index, id) {
    const {mentorSkills} = this.state;
    mentorSkills[index].experience = e.target.value;
    this.setState({mentorSkills: mentorSkills});
  }

  handleSelect = name => value => {
		this.setState({[name]: value });
	}

  getEditElement(index, id) {
    var {editFlag} = this.state;
    var disabled = false;
    if(editFlag[index] == true) {
      disabled = true;
    }

    return (
      <button
        type="button"
        class="btn btn-warning"
        disabled={disabled}
        id={id}
        onClick={(e) => this.enableEdit(e, index, id)}>Edit</button>
    );
  }

  getSkillsTableBody() {
    var rows = [];
    const {mentorSkills} = this.state;
    var {editFlag} = this.state;

    for (const [index, value] of mentorSkills.entries()) {
      //editFlag[index] = false;
      rows.push(
        <tr>
          <td>{value.technology}</td>
          <td>{this.getExperienceElement(value.experience, index, value.id)}</td>
          <td>{this.getEditElement(index, value.id)}</td>
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
    const {technology, technologyOptions} = this.state;
    return (
      <div class="edit-skills-container">
        <div class="add-skill">
          <h5>Add Skill</h5>
          <div class="technology-input">
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
          <input type="text" class="form-control"
            placeholder="Experience"
            value={this.state.experience}
            onChange={this.handleExperienceChange}/>
          <button type="button" class="btn btn-info"
            style={{padding: '10px 70px',
                    marginLeft: '0px'}}
            onClick={this.addSkill}
            >Add</button>
        </div>
        <div class="edit-skills">
          <h5>Skills</h5>
          <table>
            <col width="200"/>
            <col width="200"/>
            <col width="200"/>
            <thead>
              <tr>
                <th>Technology</th>
                <th>Experience</th>
                <th></th>
              </tr>
            </thead>
            {this.getSkillsTableBody()}
          </table>
        </div>
        <div class="save-button">
          <button type="button" class="btn btn-info"
            style={{padding: '10px 70px',
                    marginLeft: '0px',
                    marginTop: '30px'}}
            onClick={this.saveSkills}
            >Save Changes</button>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(EditSkills);
