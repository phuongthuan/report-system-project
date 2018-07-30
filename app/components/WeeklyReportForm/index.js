import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  CardHeader,
  Label
} from 'reactstrap'
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';
import moment from "moment/moment";

class WeeklyReportForm extends Component {

  onSubmitForm = (event, errors, values) => {
    const {addFlashMessage, createWeeklyReport, user, history} = this.props;

    if (errors.length === 0) {

      const weeklyReport = {
        date: moment().toString(),
        userId: user.id,
        issue: values.issue,
        solution: values.solution,
        description: values.description,
        summary: values.summary
      }

      createWeeklyReport(weeklyReport);

      addFlashMessage({
        type: 'success',
        text: 'Create Weekly Report Successful'
      });
      history.push('/statistic');
    } else {
      addFlashMessage({
        type: 'error',
        text: 'Failed to submit form.'
      });
    }
  }

  render() {
    return (
      <AvForm onSubmit={this.onSubmitForm}>
        <Card style={{borderRadius: '0'}} className="border-0 shadow-sm">
          <CardHeader>
            Create Weekly Report
          </CardHeader>
          <CardBody>

            <AvGroup>
              <Label for="issue">Issue</Label>
              <AvInput
                bsSize="sm"
                type="textarea"
                style={{height: '70px'}}
                name="issue"
                required
              />
              <AvFeedback>This field is invalid</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="solution">Solution</Label>
              <AvInput
                bsSize="sm"
                type="textarea"
                style={{height: '70px'}}
                name="solution"
                required
              />
              <AvFeedback>This field is invalid</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="description">Description</Label>
              <AvInput
                bsSize="sm"
                type="textarea"
                style={{height: '70px'}}
                name="description"
                required
              />
              <AvFeedback>This field is invalid</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="summary">Summary</Label>
              <AvInput
                bsSize="sm"
                type="textarea"
                style={{height: '100px'}}
                name="summary"
                required
              />
              <AvFeedback>This field is invalid</AvFeedback>
            </AvGroup>

          </CardBody>

          <CardFooter>
            <ButtonGroup>
              <Button
                color="success"
                type="submit"
              >
                Create weekly report
              </Button>
              <Button size="sm">
                <Link
                  style={{
                    textDecoration: 'none',
                    color: '#fff'
                  }}
                  to="/statistic"
                >
                  Back to Statistic Page
                </Link>
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </AvForm>
    );
  }
}

WeeklyReportForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  weekly_report: PropTypes.shape({
    userId: PropTypes.number,
    issue: PropTypes.string,
    solution: PropTypes.string,
    description: PropTypes.string,
    summary: PropTypes.string
  })
};

export default WeeklyReportForm;
