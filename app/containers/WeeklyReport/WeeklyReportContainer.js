import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SideBar from 'components/SideBar'
import WeeklyReportForm from "../../components/WeeklyReportForm";
import { selectUser } from "../Auth/selectors";
import { addFlashMessage } from "../FlashMessage/actions";
import { createWeeklyReport } from "./actions";

class WeeklyReportContainer extends Component {
  render() {
    const { addFlashMessage, createWeeklyReport, user } = this.props;
    return (
      <div className="row">
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <WeeklyReportForm
            {...this.props}
            user={user}
            addFlashMessage={addFlashMessage}
            createWeeklyReport={createWeeklyReport}
          />
        </div>
      </div>
    );
  }
}

WeeklyReportContainer.propTypes = {
  user: PropTypes.object,
  addFlashMessage: PropTypes.func
};

const mapStateToProps = state => ({
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  { addFlashMessage, createWeeklyReport}
)(WeeklyReportContainer);
