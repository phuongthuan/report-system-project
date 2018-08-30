import React, { PureComponent } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import moment from 'moment';

class DatePickerComponent extends PureComponent {

  onChange = (date, dateString) => {
    const {
      actionChange,
      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfUserByDay,
      user,
      location,
      match
    } = this.props;

    const teamName = (location && location.state)
      ? location.state.teamName
      : undefined;

    const userId = match.params.id;

    if (user && user.role === 'member') {
      fetchAllReportsOfUserByDay(user.id, dateString);
    }

    if (user && user.role === 'team_leader') {
      fetchAllReportsOfTeamByDay(user.division, dateString);
      fetchAllReportsOfUserByDay(userId, dateString);
      actionChange(dateString);
    }

    if (user && user.role === 'group_leader') {
      fetchAllReportsOfTeamByDay(teamName, dateString);
      fetchAllReportsOfUserByDay(userId, dateString);
      actionChange(dateString);
    }
  }

  render() {
    return (
      <DatePicker
        onChange={this.onChange}
        placeholder="Select date"
        value={moment()}
      />
    );
  }
}

export default DatePickerComponent;