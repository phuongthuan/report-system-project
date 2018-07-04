import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReportForm from 'components/ReportForm'
import ReportsList from 'components/ReportsList'

import * as ReportPageActions from './actions';

class ReportPage extends PureComponent {

  componentDidMount() {
    const {fetchReports: getReports} = this.props;
    getReports();
  }

  render() {
    const {reports} = this.props;
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <ReportForm/>
          <ReportsList reportsList={reports} />
        </div>
      </div>
    );
  }
}

ReportPage.propTypes = {
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
)(ReportPage);
