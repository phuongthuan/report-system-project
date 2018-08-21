import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import WeeklyReportTable from '../../components/WeeklyReportTable/index'
import { deleteWeeklyReport, fetchAllWeeklyReportsOfUser } from "./actions";
import { selectWeeklyReportLoading, selectWeeklyReports } from "./selectors";
import Spinner from "../../components/Spinner";
import { addFlashMessage } from "../FlashMessage/actions";

class WeeklyReportContainer extends Component {

  componentDidMount() {
    const {fetchAllWeeklyReportsOfUser, location} = this.props;
    const userId = location.state.teamName;
    fetchAllWeeklyReportsOfUser(userId);
  }

  render() {
    const {weekly_reportLoading, weekly_reports, removeWeeklyReport, addFlashMessage} = this.props;
    return (
      <div className="row">
        {weekly_reportLoading && isEmpty(weekly_reports) ? (
          <Spinner height="650px" style={{fontSize: 32, color: '#FFFFFF'}}/>
        ) : (
          <div className="col-md-12">
            <WeeklyReportTable
              addFlashMessage={addFlashMessage}
              removeWeeklyReport={removeWeeklyReport}
              data={weekly_reports}
            />
          </div>
        )}
      </div>
    );
  }
}

WeeklyReportContainer.propTypes = {
  weekly_reports: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllWeeklyReportsOfUser: PropTypes.func.isRequired,
  removeWeeklyReport: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  weekly_reportLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  weekly_reportLoading: selectWeeklyReportLoading(state),
  weekly_reports: selectWeeklyReports(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllWeeklyReportsOfUser: userId => dispatch(fetchAllWeeklyReportsOfUser(userId)),
  removeWeeklyReport: id => dispatch(deleteWeeklyReport(id)),
  addFlashMessage: message => dispatch(addFlashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyReportContainer);
