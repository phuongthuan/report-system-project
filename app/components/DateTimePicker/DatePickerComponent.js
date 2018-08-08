import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';

class DatePickerComponent extends Component {

  onChange = (date, dateString) => {
    const {
      actionChange,
      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfUserByDay,
      user,
      location
    } = this.props;

    const teamName = (location && location.state)
      ? location.state.teamName
      : undefined;

    if (user && user.role === 'member') {
      fetchAllReportsOfUserByDay(user.id, dateString);
    }

    if (user && user.role === 'team_leader') {
      fetchAllReportsOfTeamByDay(user.division, dateString);
      actionChange(dateString);
    }

    if (user && user.role === 'group_leader') {
      fetchAllReportsOfTeamByDay(teamName, dateString);
      actionChange(dateString);
    }

    console.log('DatePicker submitted!', dateString);
  }

  render() {
    return (
      <Fragment>
        <DatePicker
          onChange={this.onChange}
          placeholder="Select date"
        />
      </Fragment>
    );
  }
}

export default DatePickerComponent;