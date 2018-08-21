import React, { Component } from 'react';
import { DatePicker } from 'antd'

const {RangePicker} = DatePicker;

class RangePickerComponent extends Component {

  onChange = (date, dateString) => {
    const {
      location,
      match,
      fetchAllReportsOfTeamByRange,
      fetchAllReportsOfUserByRange,
      user,
      actionChange
    } = this.props;

    const teamName = (location && location.state)
      ? location.state.teamName
      : undefined;

    const userId = match.params.id;

    const action = `from ${dateString[0]} to ${dateString[1]}`;

    if (user && user.role === 'member') {
      fetchAllReportsOfUserByRange(user.id, dateString)
    }

    if (user && user.role === 'team_leader') {
      fetchAllReportsOfTeamByRange(user.division, dateString);
      fetchAllReportsOfUserByRange(userId, dateString)
      actionChange(action)
    }

    if (user && user.role === 'group_leader') {
      fetchAllReportsOfTeamByRange(teamName, dateString);
      fetchAllReportsOfUserByRange(userId, dateString)
      actionChange(action)
    }
    console.log('RangePicker submitted!', dateString);
  }

  render() {
    return (
      <RangePicker
        onChange={this.onChange}
      />
    );
  }
}

RangePickerComponent.propTypes = {};

export default RangePickerComponent;
