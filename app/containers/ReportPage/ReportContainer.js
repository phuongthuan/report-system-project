import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReportsList from '../../components/ReportsList'
import SideBar from '../../components/SideBar'
import * as ReportPageActions from './actions';
import { selectError, selectLoading, selectReports } from "./selectors";
import { selectUser } from "../Auth/selectors";

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class ReportContainer extends PureComponent {

  componentDidMount() {
    const {fetchAllReportsOfUser, user} = this.props;
    fetchAllReportsOfUser(user.id);
  }

  render() {
    const {reports, deleteReport, loading} = this.props;
    // console.log('Report Container', reports);
    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar/>
        </div>
        <div className="col-md-8">
          {loading && isEmpty(reports) ? (
            <Spinner>
              <FontAwesomeIcon icon="spinner" size="lg" spin/>
            </Spinner>
          ) : (
            <ReportsList
              deleteReport={deleteReport}
              reportsList={reports}
            />
          )}
        </div>
      </div>
    );
  }
}

ReportContainer.propTypes = {
  fetchAllReportsOfUser: PropTypes.func,
  deleteReport: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  reports: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};

export const mapStateToProps = state => ({
  reports: selectReports(state),
  loading: selectLoading(state),
  error: selectError(state),
  user: selectUser(state)
});

export const mapDispatchToProps = dispatch => ({
  fetchAllReportsOfUser: userId => dispatch(ReportPageActions.fetchAllReportsOfUser(userId)),
  deleteReport: reportId => dispatch(ReportPageActions.deleteReport(reportId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer);