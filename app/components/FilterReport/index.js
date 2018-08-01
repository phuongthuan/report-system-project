import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePickerComponent from "../DateTimePicker/DatePickerComponent";
import RangePickerComponent from "../DateTimePicker/RangePickerComponent";

class FilterReport extends Component {
  render() {
    const {
      fetchAllReportsOfUserByRange,
      fetchAllReportsOfUserByDay,

      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfTeamByRange,
      user
    } = this.props;
    return (
      <div className="d-flex justify-content-between">

        <DatePickerComponent
          user={user}
          fetchAllReportsOfUserByDay={fetchAllReportsOfUserByDay}
          fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
        />
        <RangePickerComponent
          user={user}
          fetchAllReportsOfUserByRange={fetchAllReportsOfUserByRange}
          fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
        />
      </div>
    );
  }
}

export default FilterReport;
