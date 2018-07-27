import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';

class DatePickerComponent extends Component {

  onChange = (date, dateString) => {
    const { getAllReportsOfTeamByDay, fetchAllReportsOfUserByDay, user } = this.props;
    if (user && user.role === 'member') {
      fetchAllReportsOfUserByDay(user.id, dateString);
    }
    if (user && user.role === 'team_leader') {
      getAllReportsOfTeamByDay(user.division, dateString);
    }
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