import React, { Component } from 'react';
import DatePickerComponent from "../DateTimePicker/DatePickerComponent";
import RangePickerComponent from "../DateTimePicker/RangePickerComponent";

class FilterReport extends Component {
  render() {
    const {
      fetchAllReportsOfUserByRange,
      fetchAllReportsOfUserByDay,

      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfTeamByRange,
      user,
      actionChange
    } = this.props;
    return (
      <div className="d-flex justify-content-between mb-3">
        <DatePickerComponent
          {...this.props}
          actionChange={actionChange}
          user={user}
          fetchAllReportsOfUserByDay={fetchAllReportsOfUserByDay}
          fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
        />
        <RangePickerComponent
          {...this.props}
          actionChange={actionChange}
          user={user}
          fetchAllReportsOfUserByRange={fetchAllReportsOfUserByRange}
          fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
        />
      </div>
    );
  }
}

export default FilterReport;
