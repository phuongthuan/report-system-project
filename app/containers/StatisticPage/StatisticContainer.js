import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import BarChart from "../../components/Chart/BarChart";
import PieChart from "../../components/Chart/PieChart";
import { getAllReportsOfTeam } from "./actions";
import { selectLoading, selectReportsOfTeam } from "./selectors";
import { selectProfile } from "../ProfilePage/selectors";
import { selectUser } from "../Auth/selectors";
import Navigation from "../../components/Navigation";
import Spinner from "../../components/Spinner";

class StatisticContainer extends Component {

  componentDidMount() {
    const { getAllReportsOfTeam, user } = this.props;
    getAllReportsOfTeam(user.division);
  }

  render() {
    const { reportsOfTeam, loading } = this.props;
    return (
      <div>
        <div className="row mt-5 mb-5">
          <div className="col-md-2">
            <SideBar/>
          </div>
          <div className="col-md-10">
            <div className="row mb-3">
              <div className="col-md-12">
                <Navigation />
              </div>
            </div>

            {loading && isEmpty(reportsOfTeam) ? (
              <Spinner />
            ) : (
              <div className="row">
                <div className="col-md-6">
                  <div className="shadow-sm">
                    <PieChart dataSource={reportsOfTeam} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="shadow-sm">
                    <BarChart dataSource={reportsOfTeam} />
                  </div>
                </div>
              </div>
            )}
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
  loading: PropTypes.bool,
  getAllReportsOfTeam: PropTypes.func,
}

const mapStateToProps = state => ({
  reportsOfTeam: selectReportsOfTeam(state),
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectLoading(state)
});

const mapDispatchToProps = dispatch => ({
  getAllReportsOfTeam: teamName => dispatch(getAllReportsOfTeam(teamName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticContainer);
