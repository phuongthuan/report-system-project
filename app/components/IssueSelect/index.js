import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import uuidv1 from 'uuid/v1'

import {
  FormGroup,
  Button,
  Col,
  Label,
} from 'reactstrap';

const issues_type = [
  {value: 1, label: 'Hard for Debugging'},
  {value: 2, label: 'Keeping up with Technology'},
  {value: 3, label: 'Communication with others'},
  {value: 4, label: 'Time Estimation'},
  {value: 5, label: 'Security Threats'}
]

class IssueSelect extends Component {

  state = {
    selectBoxs: [],
    values: [],
  }

  onSelectedIssueHandleChange = (selectedValue) => {
    const {setData} = this.props;
    const {values} = this.state;
    if (selectedValue) {
      let issue = selectedValue.label.toString();
      this.setState(prevState => ({
        values: [
          ...prevState.values,
          issue
        ]
      }));
      setData(values);
    }
  }

  addSelectBox = () => {
    this.setState(prevState => ({
      selectBoxs: [...prevState.selectBoxs, '']
    }))
  }

  removeSelectBox = (idx) => {
    let selectBoxs = [...this.state.selectBoxs];
    selectBoxs.splice(idx,1);
    this.setState({ selectBoxs });
  }

  createUI = () => {
    const { selectBoxs } = this.state;
    return selectBoxs.map((selectBox, i) => (
      <FormGroup key={i} row>
        <Col sm={8}>
          <Select
            className="issue-select"
            classNamePrefix="report-system"
            defaultValue={selectBox}
            placeholder="Select Issue"
            options={issues_type}
            onChange={this.onSelectedIssueHandleChange}
          />
        </Col>
        <Button
          sm={2}
          onClick={this.removeSelectBox}
        >
          <strong> - </strong>
        </Button>
      </FormGroup>
    ))
  }

  render() {
    return (
      <Fragment>
        <Label for="issues">Issues</Label>
        {this.createUI()}
        <FormGroup row>
          <Col>
            <Button
              onClick={this.addSelectBox}
              color="link"
            >
              + Add new issue
            </Button>
          </Col>
        </FormGroup>
      </Fragment>
    );
  }
}

export default IssueSelect;
