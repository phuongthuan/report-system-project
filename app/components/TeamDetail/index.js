import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty';
import moment from "moment/moment";
import { Card, CardBody, CardHeader, CardTitle, CardSubtitle } from 'reactstrap'
import { Button } from 'antd'
import Spinner from "../Spinner";
import Chip from '../Chip/index'
import ProgressBar from "../ProgressBar";

class TeamDetail extends PureComponent {

  navigate = (payload) => {
    const {history} = this.props;
    history.push({
      pathname: payload.url,
      state: {teamName: payload.teamName}
    });
  }

  render() {
    const {team, reportsOfTeam} = this.props;
    const {userId, members} = team;
    return (
      <Fragment>
        {(isEmpty(team && team.userId) && isEmpty(team.members) && isEmpty(team.userId && team.userId.weekly_reports)) ? (
          <Spinner height="650px" style={{fontSize: 32}}/>
        ) : (
          <Card style={{borderRadius: '0'}} className="border-0 shadow-sm">
            <CardHeader className="text-center">
              <CardTitle>
                {team.name}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-md-4">
                  <CardSubtitle className="mb-3">Team leader</CardSubtitle>
                  <Chip
                    {...this.props}
                    userInfo={userId}
                  />
                  <br/>

                  <CardSubtitle className="mb-3">Members</CardSubtitle>
                  {members.filter(member =>
                    member.id !== team.userId.id)
                    .map(member => (
                      <Chip
                        {...this.props}
                        key={member.id}
                        userInfo={member}
                      />
                    ))}
                </div>

                <div className="col-md-8">
                  <div className="row mb-3">
                    <div className="col-md-6 pl-0">
                      <CardSubtitle className="mb-3">Emotion</CardSubtitle>
                      <ProgressBar
                        data={reportsOfTeam}
                      />
                    </div>
                  </div>

                  <hr/>

                  <div className="row">
                    <div className="col-md-12 pl-0">
                      <CardSubtitle className="mb-3">Introduction</CardSubtitle>
                      {team.description}
                    </div>
                  </div>

                  <hr/>

                  <div className="row mt-4">
                    <div className="col-md-12 pl-0">
                      <CardSubtitle className="">Weekly report</CardSubtitle>
                      <p>
                        {team.userId.weekly_reports[0].issue}
                      </p>
                      <p>
                        {team.userId.weekly_reports[0].solution}
                      </p>
                      <p>
                        {team.userId.weekly_reports[0].description}
                      </p>
                      <p>
                        {team.userId.weekly_reports[0].comment}
                      </p>
                      <p>
                        {moment(team.userId.weekly_reports[0].date).format("dddd, MMMM Do YYYY")}
                      </p>
                    </div>
                  </div>

                  <hr/>
                  <div className="row mt-4">
                    <Button
                      onClick={() => this.navigate({
                        url: `/team/${team.id}/statistic`,
                        teamName: team.name
                      })}
                      type="primary"
                      icon="pie-chart"
                    >
                      Statistic
                    </Button>
                  </div>

                  <div className="row mt-2">
                    <Button
                      onClick={() => this.navigate({
                        url: `/team/${team.id}/weekly-report`,
                        teamName: (team.userId && team.userId.id)
                      })}
                      type="primary"
                      icon="table"
                    >
                      Weekly reports
                    </Button>
                  </div>

                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </Fragment>
    );
  }
}

TeamDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
    }).isRequired,
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  reportsOfTeam: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TeamDetail;
