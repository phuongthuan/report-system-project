import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import WeeklyReportForm from "../../components/WeeklyReportForm";
import { selectUser } from "../Auth/selectors";
import { addFlashMessage } from "../FlashMessage/actions";

class WeeklyReportContainer extends Component {
  render() {
    return (
      <div>
        <WeeklyReportForm/>
      </div>
    );
  }
}

WeeklyReportContainer.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  addFlashMessage
)(WeeklyReportContainer);
