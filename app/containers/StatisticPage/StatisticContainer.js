import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import BarChart from "../../components/Chart/BarChart";
import PieChart from "../../components/Chart/PieChart";
import { getAllReportsOfTeam } from "./actions";
import { selectReportsOfTeam } from "./selectors";
import { selectProfile } from "../ProfilePage/selectors";
import { selectUser } from "../Auth/selectors";

class StatisticContainer extends Component {

  componentDidMount() {
    const { getAllReportsOfTeam, user } = this.props;
    getAllReportsOfTeam(user.division);
  }

  render() {
    const { reportsOfTeam } = this.props;
    console.log('StatisticContainer', reportsOfTeam);
    return (
      <div>
        <div className="row mt-5 mb-5">
          <div className="col-md-2">
            <SideBar/>
          </div>
          <div className="col-md-5">
            {/*{loading && isEmpty(profile) ? (*/}
            {/*<FontAwesomeIcon icon="spinner" size="lg" spin/>*/}
            {/*) : (*/}
            {/*<div className="shadow-sm">*/}
            {/*Static Container*/}
            {/*</div>*/}
            {/*)}*/}
            <div className="shadow-sm">
              <PieChart />
            </div>
          </div>

          <div className="col-md-5">
            {/*{loading && isEmpty(profile) ? (*/}
            {/*<FontAwesomeIcon icon="spinner" size="lg" spin/>*/}
            {/*) : (*/}
            {/*<div className="shadow-sm">*/}
            {/*Static Container*/}
            {/*</div>*/}
            {/*)}*/}
            <div className="shadow-sm">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StatisticContainer.propTypes = {
  reportsOfTeam: PropTypes.array,
  profile: PropTypes.object,
  user: PropTypes.object,
  getAllReportsOfTeam: PropTypes.func,
}

const mapStateToProps = state => ({
  reportsOfTeam: selectReportsOfTeam(state),
  profile: selectProfile(state),
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  getAllReportsOfTeam: teamName => dispatch(getAllReportsOfTeam(teamName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticContainer);
