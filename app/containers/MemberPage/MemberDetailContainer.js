import React, { Component } from 'react';
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import Spinner from 'components/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import MemberDetail from "../../components/MemberDetail";
import { selectError, selectReportLoading, selectReports } from "../ReportPage/selectors";
import { fetchAllReportsOfUser } from "../ReportPage/actions";
import { selectMember, selectMemberLoading } from "./selectors";
import { getMemberProfile } from "./actions";
import { selectUser } from "../Auth/selectors";

class MemberDetailContainer extends Component {

  componentDidMount() {
    const { match, fetchAllReportsOfUser, getMemberProfile } = this.props;
    const memberId = match.params.id;
    fetchAllReportsOfUser(memberId);
    getMemberProfile(memberId);
  }

  render() {
    const { reports, loading, memberLoading, member, user} = this.props;

    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar />
        </div>
        <div className="col-md-8">
          {loading && isEmpty(reports) ? (
            <Spinner height="650px" style={{fontSize: 32, color: '#FFFFFF'}} />
          ) : (
            <MemberDetail
              user={user}
              {...this.props}
              member={member}
              reportsList={reports}
              loading={loading}
              memberLoading={memberLoading}
            />
          )}
        </div>
      </div>
    );
  }
}

MemberDetailContainer.propTypes = {
  reports: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  memberLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  member: PropTypes.object.isRequired,
  fetchAllReportsOfUser: PropTypes.func.isRequired,
  getMemberProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  reports: selectReports(state),
  loading: selectReportLoading(state),
  error: selectError(state),
  user: selectUser(state),
  member: selectMember(state),
  memberLoading: selectMemberLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllReportsOfUser: userId => dispatch(fetchAllReportsOfUser(userId)),
  getMemberProfile: id => dispatch(getMemberProfile(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberDetailContainer);
