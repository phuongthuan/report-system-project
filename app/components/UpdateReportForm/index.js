import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1'
import IssueSelect from 'components/IssueSelect';
import Select from 'react-select';
import moment from 'moment'
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
  Label,
  CardFooter,
  ButtonGroup
} from 'reactstrap';

class UpdateReportForm extends Component {

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    report: PropTypes.object,
    updateReport: PropTypes.func,
    addFlashMessage: PropTypes.func
  };

  state = {
    report: {},
    numberSelectBox: 0
  };

  componentDidMount() {
    const {report} = this.props;
    const numberSelectBox = report.issues ? report.issues.length : 0;
    this.setState({
      report,
      numberSelectBox
    });
  }

  componentWillReceiveProps(nextProps, state) {
    this.setState({ report: nextProps.report });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const {report} = this.state;
    const {updateReport, history, addFlashMessage} = this.props;
    updateReport(report);
    addFlashMessage({
      type: 'success',
      text: 'Update Report Successful'
    });
    history.push('/report');
  };


  onHandleFormChange = (e) => {
    const {report} = this.state;
    this.setState({
      report: {
        ...report,
        [e.target.name]: e.target.value
      }
    });
  }

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
    const {report} = this.state;
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
        <Card style={{borderRadius: '0'}} className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Update Daily Report</CardTitle>
            <Label for="date">{moment().format("dddd, MMMM Do YYYY")}</Label>
          </CardHeader>

          <CardBody>
            <Label for="title">Title</Label>
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

            <Label for="achievement">Today Achievement</Label>
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

            <Label for="plan">Planing for next day</Label>
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

            <Label for="description">Description</Label>
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

            <Label for="comment">Comment</Label>
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
                size="sm"
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

export default UpdateReportForm;
