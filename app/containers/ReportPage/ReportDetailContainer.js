import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SideBar from 'components/SideBar'
import isEmpty from "lodash/isEmpty";
import { addFlashMessage } from "../FlashMessage/actions";
import { selectAReport, selectReportLoading } from "./selectors";
import { fetchAReport } from "./actions";
import ReportDetail from "../../components/ReportDetail";
import Spinner from "../../components/Spinner";

class ReportDetailContainer extends Component {

  componentDidMount() {
    const {fetchAReport, match} = this.props;
    const reportId = match.params.id;
    fetchAReport(reportId);
  }

  render() {
    const {report, reportLoading} = this.props;
    return (
      <div className="row">
        <div className="col-md-3">
          <SideBar/>
        </div>
        {reportLoading && isEmpty(report) ? (
          <Spinner height="650px" style={{fontSize: 32, color: '#FFFFFF'}}/>
        ) : (
          <div className="col-md-9">
            <ReportDetail
              {...this.props}
              report={report}
            />
          </div>
        )}
      </div>
    );
  }
}

ReportDetailContainer.propTypes = {};

const mapStateToProps = state => ({
  report: selectAReport(state),
  reportLoading: selectReportLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAReport: id => dispatch(fetchAReport(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportDetailContainer);
