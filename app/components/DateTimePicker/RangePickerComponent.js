import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker;

class RangePickerComponent extends Component {

  onChange = (date, dateString) => {
    const { getAllReportsOfTeamByRange, fetchAllReportsOfUserByRange, user } = this.props;
    if (user && user.role === 'member') {
      fetchAllReportsOfUserByRange(user.id, dateString)
    }
    if (user && user.role === 'team_leader') {
      getAllReportsOfTeamByRange(user.division, dateString);
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
