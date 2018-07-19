import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import BarChart from "../../components/Chart/BarChart";
import PieChart from "../../components/Chart/PieChart";
import { selectMembers } from "../MemberPage/selectors";
import { selectReports } from "../ReportPage/selectors";
import { fetchAllMembersOfTeam } from "../MemberPage/actions";
import { fetchAllReportsOfUser } from "../ReportPage/actions";

class StatisticContainer extends Component {

  state = {

  }

  componentDidMount() {
    // Fetch all reports of Front End Team.
    // Fetch user, then fetch all reports of that user.


  }

  // fetchAllReportOfTeam = (userId, teamName) => {
  //   const { fetchAllMembersOfTeam } = this.props;
  //   fetchAllMembersOfTeam(teamName);
  // }

  render() {
    return (
      <div>
        <div className="row mt-5 mb-5">
          <div className="col-md-2">
            <SideBar/>
          </div>
          <div className="col-md-5">
            {/*{loading && isEmpty(profile) ? (*/}
            {/*<FontAwesomeIcon icon="spinner" size="lg" spin/>*/}
            {/*) : (*/}
            {/*<div className="shadow-sm">*/}
            {/*Static Container*/}
            {/*</div>*/}
            {/*)}*/}
            <div className="shadow-sm">
              <PieChart />
            </div>
          </div>

          <div className="col-md-5">
            {/*{loading && isEmpty(profile) ? (*/}
            {/*<FontAwesomeIcon icon="spinner" size="lg" spin/>*/}
            {/*) : (*/}
            {/*<div className="shadow-sm">*/}
            {/*Static Container*/}
            {/*</div>*/}
            {/*)}*/}
            <div className="shadow-sm">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StatisticContainer.propTypes = {
  members: PropTypes.object,
  reports: PropTypes.object,
  fetchAllReportsOfUser: PropTypes.func,
  fetchAllMembersOfTeam: PropTypes.func,
}

const mapStateToProps = state => ({
  members: selectMembers(state),
  reports: selectReports(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllMembersOfTeam: payload => dispatch(fetchAllMembersOfTeam(payload)),
  fetchAllReportsOfUser: id => dispatch(fetchAllReportsOfUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticContainer);
