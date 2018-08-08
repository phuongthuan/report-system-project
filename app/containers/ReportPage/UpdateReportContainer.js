import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import Spinner from 'components/Spinner'
import PropTypes from "prop-types";
import SideBar from '../../components/SideBar'
import ReportForm from '../../components/ReportForm/index'
import { selectAReport, selectError, selectReportLoading } from "./selectors";
import { addFlashMessage } from "../FlashMessage/actions";
import { fetchAReport, updateReport } from "./actions";
import { selectUser } from "../Auth/selectors";

class UpdateReportContainer extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    report: PropTypes.object.isRequired,
    fetchAReport: PropTypes.func.isRequired,
    updateReport: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {fetchAReport, match} = this.props;
    const reportId = match.params.id;
    fetchAReport(reportId);
  }

  render() {
    const {updateReport, report, loading, addFlashMessage, user} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <SideBar/>
          </div>
          <div className="col-md-9">
            {loading && isEmpty(report) ? (
              <Spinner height="650px" style={{fontSize: 32, color: '#FFFFFF'}}/>
            ) : (
              <ReportForm
                {...this.props}
                user={user}
                report={report}
                updateReport={updateReport}
                addFlashMessage={addFlashMessage}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  report: selectAReport(state),
  loading: selectReportLoading(state),
  error: selectError(state),
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAReport: id => dispatch(fetchAReport(id)),
  updateReport: payload => dispatch(updateReport(payload)),
  addFlashMessage: message => dispatch(addFlashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateReportContainer);
