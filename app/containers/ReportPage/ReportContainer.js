import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/Button'
import ReportsList from 'components/ReportsList'

import * as ReportPageActions from './actions';

class ReportContainer extends PureComponent {

  componentDidMount() {
    const {fetchReports: getReports} = this.props;
    getReports();
  }

  render() {
    console.log(localStorage.getItem('token'));
    const {reports, match} = this.props;
    return (
      <div className="container mt-5 mb-5">
        <Link to={`${match.url}/create`}>
          <Button primary>
            Create new Report
          </Button>
        </Link>
        <div className="row">
          <ReportsList reportsList={reports} />
        </div>
      </div>
    );
  }
}

ReportContainer.propTypes = {
  fetchReports: PropTypes.func,
};

export const mapStateToProps = state => ({
  reports: state.reportpage.data,
  loading: state.reportpage.loading,
  error: state.reportpage.error,
});

export const mapDispatchToProps = dispatch => ({
  fetchReports: () => dispatch(ReportPageActions.fetchReports())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer);
