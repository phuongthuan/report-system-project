import React, { Component } from 'react';
import isEmpty from "lodash/isEmpty";
import Spinner from 'components/Spinner'
import PropTypes from 'prop-types';
import Member from "../Member";
import ReportTable from '../ReportTable/index'
import WeeklyReportTable from '../WeeklyReportTable/index'

class MemberDetail extends Component {

  tableData = () => {
    const {
      action,
      member,
      user,
      reportsList,
      weeklysReportList,
      addFlashMessage,
      removeWeeklyReport,
      actionChange,

      fetchAllReportsOfUserByRange,
      fetchAllReportsOfUserByDay,
      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfTeamByRange,

    } = this.props;

    if (member.role === 'member') {
      return (
        <ReportTable
          {...this.props}
          action={action}
          actionChange={actionChange}
          user={user}
          data={reportsList}
          fetchAllReportsOfUserByDay={fetchAllReportsOfUserByDay}
          fetchAllReportsOfUserByRange={fetchAllReportsOfUserByRange}
          fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
          fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
        />
      )
    } else if (member.role === 'team_leader') {
      return (
        <WeeklyReportTable
          {...this.props}
          addFlashMessage={addFlashMessage}
          removeWeeklyReport={removeWeeklyReport}
          data={weeklysReportList}
        />
      )
    }
  }

  render() {
    const {reportsList, loading, member, user} = this.props;
    return (
      <div>
        <Member
          member={member}
          user={user}
        />
        {loading && isEmpty(reportsList) ? (
          <Spinner/>
        ) : this.tableData()}
      </div>
    );
  }
}

MemberDetail.propTypes = {
  reportsList: PropTypes.array.isRequired,
  member: PropTypes.object,
};

export default MemberDetail;
