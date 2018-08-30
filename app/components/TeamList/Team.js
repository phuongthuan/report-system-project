import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Card, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from "styled-components";
import img from '../../assests/images/Gabe_newell.png'
import { selectReportsOfTeam, selectStatisticLoading } from "../../containers/StatisticPage/selectors";
import { getAllReportsOfTeam } from "../../containers/StatisticPage/actions";

const Image = styled.img`
  width: 64px;
  height: 64px;
`;

class Team extends PureComponent {

  render() {
    const {team} = this.props;
    const {id, name, userId} = team;
    const image = userId ? userId.avatar : img;
    const weeklyReport = team.userId.weekly_reports[0].summary;

    return (
      <Card className="mb-3 border-0 shadow-sm">
        <CardBody>
          <div className="media">
            <Link to={`member/${userId.id}`}>
              <Image className="mr-3 rounded-circle" src={image} alt={userId.firstName}/>
            </Link>
            <div className="media-body">
              <h5 className="mt-0">
                <Link
                  to={{
                    pathname: `team/${id}`,
                    state: {teamName: name}
                  }}
                >
                  {name}
                </Link>
              </h5>
              <br/>
              <div className="font-weight-bold">
                Summary of week:
              </div>
              {weeklyReport}
              <br/>
            </div>
            <br/>
          </div>
        </CardBody>
      </Card>
    );
  }
}

Team.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  reportsOfTeam: selectReportsOfTeam(state),
  loading: selectStatisticLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllReportsOfTeam: teamName => dispatch(getAllReportsOfTeam(teamName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);
