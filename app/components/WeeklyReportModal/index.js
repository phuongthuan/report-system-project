import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Dialog, TextField, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core'
import moment from 'moment';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button } from 'reactstrap'

class WeeklyReportModal extends Component {

  state = {
    weekly_report: {
      date: moment().format("YYYY-MM-DD"),
      issue: '',
      solution: '',
      description: '',
      summary: ''
    },
    disabled: true,
    open: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {weekly_report} = this.state;
    const { addFlashMessage, createWeeklyReport } = this.props;
    createWeeklyReport(weekly_report);
    addFlashMessage({
      type: 'success',
      text: 'Weekly Report has been created.'
    });
  }

  handleChange = e => {
    const {weekly_report} = this.state;

    if (e.target.value === '') {
      this.setState({
        disabled: true
      });
    }

    console.log(e.target.value);

    this.setState({
      weekly_report: {
        ...weekly_report,
        [e.target.name]: e.target.value
      },
      disabled: false
    });
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const { issue, solution, description, summary } = this.state.weekly_report;
    return (
      <div>
        <Button color="info" size="sm" onClick={this.handleClickOpen}>
          Create weekly report
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <ValidatorForm
            onSubmit={this.onSubmit}
          >
            <DialogTitle id="form-dialog-title">Weekly Report</DialogTitle>
            <DialogContent>

              <DialogContentText>
                Write weekly report for group leader.
              </DialogContentText>

              <TextValidator
                autoFocus
                name="issue"
                label="Issue"
                fullWidth
                value={issue}
                onChange={this.handleChange}
                autoComplete="off"
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Not Email']}
              />

            </DialogContent>
            <DialogActions>
              <Button
                disabled={this.state.disabled}
                color="primary"
                size="sm"
                onClick={this.handleClose}
                type="submit"
              >
                Submit
              </Button>
              <Button size="sm" color="light" onClick={this.handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>

      </div>
    );
  }
}

WeeklyReportModal.propTypes = {};

export default WeeklyReportModal;
