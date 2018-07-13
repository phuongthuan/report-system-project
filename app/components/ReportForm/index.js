import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import IssueSelect from 'components/IssueSelect';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
  Form,
  FormGroup,
  Button,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  ButtonGroup
} from 'reactstrap';
import * as actionsType from '../../containers/ReportPage/actions';

const issues_type = [
  {value: 1, label: 'Hard for Debugging'},
  {value: 2, label: 'Keeping up with Technology'},
  {value: 3, label: 'Communication with others'},
  {value: 4, label: 'Time Estimation'},
  {value: 5, label: 'Security Threats'}
]

class ReportForm extends Component {

  state = {
    numberSelectBox: 0,
    report : {
      userId: 1,
      title: '',
      achievement: '',
      plan: '',
      issues: [],
      description: '',
      comment: ''
    }
  }

  onHandleFormChange = (e) => {
    const { report } = this.state;
    this.setState({
      report: {
        ...report,
        [e.target.name]: e.target.value
      }
    });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { report } = this.state;
    const { createReport: dispatchCreateReport, history } = this.props;
    dispatchCreateReport(report);
    history.push('/report');
  };

  onSelectedIssueHandleChange = (selectedValue) => {
    if (selectedValue) {
      let issue = selectedValue.label.toString().toLowerCase();
      const { report } = this.state;
      this.setState({
        report: {
          ...report,
          issues: [
            ...report.issues,
            issue
          ]}
      });
    }
  }

  onAddSelectBox = () => {
    const { numberSelectBox } = this.state;
    this.setState({ numberSelectBox: numberSelectBox + 1});
  }

  onRemoveSelectBox = () => {
    const { numberSelectBox } = this.state;
    this.setState({ numberSelectBox: numberSelectBox - 1});
  }

  render() {
    const {
      numberSelectBox,
      report
    } = this.state;

    const children = [];

    for (var i = 0; i < numberSelectBox; i += 1) {
      children.push(
        <FormGroup key={i} row>
          <Col sm={8}>
            <Select
              className="issue-select"
              classNamePrefix="report-system"
              placeholder="Select Issue"
              options={issues_type}
              onChange={this.onSelectedIssueHandleChange}
            />
          </Col>
          <Button sm={2} onClick={this.onRemoveSelectBox}><strong> - </strong></Button>
        </FormGroup>
      );
    }

    return (
      <Form onSubmit={this.onSubmitForm}>
        <Card>
          <CardHeader>
            <FormGroup>
              <Input
                type="text"
                name="title"
                bsSize="lg"
                autoComplete="off"
                value={report.title}
                placeholder="Title"
                onChange={this.onHandleFormChange}
              />
            </FormGroup>
          </CardHeader>

          <CardBody>

            <CardTitle>Today Achievement</CardTitle>
            <FormGroup>
              <Input
                type="textarea"
                name="achievement"
                placeholder="What achievement did you get today ?"
                value={report.achievement}
                bsSize="sm"
                onChange={this.onHandleFormChange}
              />
            </FormGroup>

            <CardTitle>Planing for next day</CardTitle>
            <FormGroup>
              <Input
                type="textarea"
                name="plan"
                value={report.plan}
                placeholder="Tomorrow I'll bla bla ..."
                bsSize="sm"
                onChange={this.onHandleFormChange}
              />
            </FormGroup>

            {/*Issue Select Box*/}
            <IssueSelect addSelectBox={this.onAddSelectBox} >
              {children}
            </IssueSelect>


            <CardTitle>Description</CardTitle>
            <FormGroup>
              <Input
                type="textarea"
                name="description"
                bsSize="sm"
                placeholder="More info ..."
                onChange={this.onHandleFormChange}
              />
            </FormGroup>

            <CardTitle>Comment</CardTitle>
            <FormGroup>
              <Input
                type="textarea"
                name="comment"
                bsSize="sm"
                placeholder="Leave a comment ..."
                onChange={this.onHandleFormChange}
              />
            </FormGroup>
          </CardBody>

          <CardFooter>
            <ButtonGroup>
              <Button
                color="success"
                type="submit"
              >
                Submit new report
              </Button>
              <Button size="sm">
                <Link
                  style={{
                    textDecoration: 'none',
                    color: '#fff'
                  }}
                  to="/report"
                >
                  Back to Report Page
                </Link>
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Form>
    );
  }
}

ReportForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  report: PropTypes.shape({
    userId: PropTypes.number,
    title: PropTypes.string,
    achievement: PropTypes.string,
    plan: PropTypes.string,
    issues: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    comment: PropTypes.string,
  }),

  createReport: PropTypes.func,
};

export const mapDispatchToProps = dispatch => ({
  createReport: report => dispatch(actionsType.createReport(report))
});

export default connect(
  null,
  mapDispatchToProps
)(ReportForm);


