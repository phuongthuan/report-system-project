import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker;

class RangePickerComponent extends Component {

  onChange = (date, dateString) => {
    const {
      location,
      fetchAllReportsOfTeamByRange,
      fetchAllReportsOfUserByRange,
      user,
      actionChange
    } = this.props;

    const teamName = (location && location.state)
      ? location.state.teamName
      : undefined;

    const action = `from ${dateString[0]} to ${dateString[1]}`;

    if (user && user.role === 'member') {
      fetchAllReportsOfUserByRange(user.id, dateString)
    }

    if (user && user.role === 'team_leader') {
      fetchAllReportsOfTeamByRange(user.division, dateString);
      actionChange(action)
    }

    if (user && user.role === 'group_leader') {
      fetchAllReportsOfTeamByRange(teamName, dateString);
      actionChange(action)
    }

    console.log('RangePicker submitted!', dateString);
  }

  render() {
    return (
      <div>
        <RangePicker onChange={this.onChange} />
      </div>
    );
  }
}

RangePickerComponent.propTypes = {};

export default RangePickerComponent;
