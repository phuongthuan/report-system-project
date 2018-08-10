import React, { Component } from 'react';
import DatePickerComponent from "../DateTimePicker/DatePickerComponent";
import RangePickerComponent from "../DateTimePicker/RangePickerComponent";
import SearchBox from "../SearchBox";

class FilterReport extends Component {
  render() {
    const {
      fetchAllReportsOfUserByRange,
      fetchAllReportsOfUserByDay,

      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfTeamByRange,
      user,
      actionChange,
      searchTerm,
      updateSearchTerm

    } = this.props;
    return (
      <div className="card border-0">
        <div className="col-md-6 card-body">

          <SearchBox
            searchTerm={searchTerm}
            onChange={updateSearchTerm}
          />

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
      </div>
    );
  }
}

export default FilterReport;
