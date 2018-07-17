import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1'
import IssueSelect from 'components/IssueSelect';
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
  CardSubtitle,
  CardFooter,
  ButtonGroup
} from 'reactstrap';

class UpdateReportForm extends Component {

  state = {
    report: {},
    numberSelectBox: 0
  }

  componentDidMount() {
    const {report} = this.props;
    const numberSelectBox = report.issues ? report.issues.length : undefined;
    this.setState({
      report,
      numberSelectBox
    });
  }

  onHandleFormChange = (e) => {
    const {report} = this.state;
    this.setState({
      report: {
        ...report,
        [e.target.name]: e.target.value
      }
    });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const {report} = this.state;
    const {updateReport, history} = this.props;
    updateReport(report);
    history.push('/report');
  };

  onAddSelectBox = () => {
    const {numberSelectBox} = this.state;
    this.setState({numberSelectBox: numberSelectBox + 1});
  }
  onRemoveSelectBox = () => {
    const {numberSelectBox} = this.state;
    this.setState({numberSelectBox: numberSelectBox - 1});
  }

  convertToSelectObject = () => {
    var issues_type = [];
    const {report} = this.state;
    if (report.issues && report.issues.constructor === Array) {
      issues_type = report.issues.map(issue => ({
        value: uuidv1(),
        label: issue
      }));
    }
    return issues_type;
  }

  render() {
    const {report, numberSelectBox} = this.state;
    const issues_type = this.convertToSelectObject();
    const children = [];

    for (let i = 0; i < issues_type.length; i++) {
      children.push(
        <FormGroup key={i} row>
          <Col sm={8}>
            <Select
              className="issue-select"
              classNamePrefix="report-system"
              placeholder="Select Issue"
              value={issues_type[i]}
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
            <CardTitle>Update Daily Report</CardTitle>
            <CardSubtitle>
              Today is: {new Date().toString()}
            </CardSubtitle>
          </CardHeader>

          <CardBody>

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
                value={report.description}
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
                value={report.comment}
                bsSize="sm"
                placeholder="Leave a comment ..."
                onChange={this.onHandleFormChange}
              />
            </FormGroup>
          </CardBody>

          <CardFooter>
            <ButtonGroup>
              <Button
                color="primary"
                type="submit"
              >
                Update report
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

UpdateReportForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  report: PropTypes.object,
  updateReport: PropTypes.func,
};

export default UpdateReportForm;
