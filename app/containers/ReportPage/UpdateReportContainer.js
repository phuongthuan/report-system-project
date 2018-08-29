import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import Spinner from 'components/Spinner'
import PropTypes from "prop-types";
import ReportForm from '../../components/ReportForm/index'
import { selectAReport, selectReportLoading } from "./selectors";
import { addFlashMessage } from "../FlashMessage/actions";
import { fetchAReport, updateReport } from "./actions";
import { selectUser } from "../Auth/selectors";

class UpdateReportContainer extends Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,

    report: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,

    user: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    }).isRequired,

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
      <div className="row mb-3">
        <div className="col-md-12 p-0">
          {loading && isEmpty(report) ? (
            <Spinner height="650px" style={{fontSize: 32}}/>
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
    );
  }
}

const mapStateToProps = state => ({
  report: selectAReport(state),
  loading: selectReportLoading(state),
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
