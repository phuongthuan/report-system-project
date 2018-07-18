import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import PropTypes from 'prop-types';
import IssueSelect from 'components/IssueSelect';
import Select from 'react-select';
import {
  Form,
  FormGroup,
  Button,
  Input,
  Col,
  CardSubtitle,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  ButtonGroup
} from 'reactstrap';

const issues_type = [
  {value: 1, label: 'Hard for Debugging'},
  {value: 2, label: 'Keeping up with Technology'},
  {value: 3, label: 'Communication with others'},
  {value: 4, label: 'Time Estimation'},
  {value: 5, label: 'Security Threats'}
]

class CreateReportForm extends Component {

  state = {
    numberSelectBox: 0,
    report : {
      emotion: {},
      date: new Date().toString(),
      userId: this.props.user.id,
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
    const { addFlashMessage, createReport, history } = this.props;
    createReport(report);
    addFlashMessage({
      type: 'success',
      text: 'Create Successful!'
    })
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
    const { numberSelectBox, report } = this.state;
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
            <CardTitle>Write Daily Report</CardTitle>
            <CardSubtitle>
              Today is: {report.date}
            </CardSubtitle>
          </CardHeader>

          <CardBody>

            <CardSubtitle>Emotions</CardSubtitle>
            <FormGroup>
              <Input
                type="text"
                name="emotion"
                bsSize="sm"
                autoComplete="off"
                value={report.emotion}
                onChange={this.onHandleFormChange}
              />
              {/*<Picker*/}
                {/*title='Pick your emoji…'*/}
                {/*emoji='point_up'*/}
                {/*emojiSize={30}*/}
                {/*showPreview={false}*/}
                {/*onClick={(emoji, event) => console.log('emoji', emoji)}*/}
              {/*/>*/}
            </FormGroup>

            <CardSubtitle>Title</CardSubtitle>
            <FormGroup>
              <Input
                type="text"
                name="title"
                bsSize="sm"
                autoComplete="off"
                value={report.title}
                placeholder="Title"
                onChange={this.onHandleFormChange}
              />
            </FormGroup>

            <CardSubtitle>Today Achievement</CardSubtitle>
            <FormGroup>
              <Input
                style={{height: '100px'}}
                type="textarea"
                name="achievement"
                placeholder="What achievement did you get today ?"
                value={report.achievement}
                bsSize="sm"
                onChange={this.onHandleFormChange}
              />
            </FormGroup>

            <CardSubtitle>Planing for next day</CardSubtitle>
            <FormGroup>
              <Input
                style={{height: '100px'}}
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


            <CardSubtitle>Description</CardSubtitle>
            <FormGroup>
              <Input
                style={{height: '100px'}}
                type="textarea"
                name="description"
                bsSize="sm"
                placeholder="More info ..."
                onChange={this.onHandleFormChange}
              />
            </FormGroup>

            <CardSubtitle>Comment</CardSubtitle>
            <FormGroup>
              <Input
                style={{height: '100px'}}
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

CreateReportForm.propTypes = {
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
  })
};

export default CreateReportForm;


