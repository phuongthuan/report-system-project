import React, { Component } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import EmojiMartPicker  from 'emoji-mart-picker';
import {
  Form,
  FormGroup,
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  ButtonGroup
} from 'reactstrap';
import 'emoji-mart/css/emoji-mart.css'
import IssueSelect from '../IssueSelect/index';

class CreateReportForm extends Component {

  state = {
    numberSelectBox: 0,
    report : {
      date: moment().format("YYYY-MM-DD"),
      emotion: {
        id: 'smiley',
        name: 'Smiling Face with Open Mouth',
        colons: ':smiley:',
        text: ':)',
        emoticons: [
          '=)',
          '=-)'
        ],
        skin: null,
        native: '😃'
      },
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

    console.log(report);
    // createReport(report);
    addFlashMessage({
      type: 'success',
      text: 'Create Report Successful'
    })
    // history.push('/report');
  };

  onChange = (emoji) => {
    if (emoji) {
      const { report } = this.state;
      this.setState({
        report: {
          ...report,
          emotion: emoji
        }
      });
    }
  }

  setIssueSelectData = (data) => {
    const { report } = this.state;
    this.setState({
      report: {
        ...report,
        issues: data
      }
    });
  }

  render() {
    const { report, date } = this.state;
    console.log(report);
    return (
      <Form onSubmit={this.onSubmitForm}>
        <Card style={{borderRadius: '0'}} className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Write Daily Report</CardTitle>
            <Label for="date">{date}</Label>
          </CardHeader>

          <CardBody>
            <Label for="title">Emotion</Label>
            <FormGroup>
              <EmojiMartPicker
                set='emojione'
                onChange={this.onChange}
              >
                <Input
                  type="text"
                  name="emotion"
                  bsSize="sm"
                  autoComplete="off"
                  value={report.emotion.native}
                  onChange={this.onHandleFormChange}
                  required
                />
              </EmojiMartPicker>
            </FormGroup>

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
                required
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
                required
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
                required
              />
            </FormGroup>

            <IssueSelect
              data={report.issues}
              setData={this.setIssueSelectData}
            />

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
                color="success"
                type="submit"
                size="sm"
              >
                Create new report
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


