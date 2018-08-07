import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Card, CardBody, CardHeader, CardTitle, CardSubtitle } from 'reactstrap'
import { Button } from 'antd'
import Spinner from "../Spinner";
import Chip from '../Chip/index'
import ProgressBar from "../ProgressBar";

class TeamDetail extends Component {

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
        {(isEmpty(team.userId) && isEmpty(team.members)) ? (
          <Spinner height="650px" style={{fontSize: 32, color: '#FFFFFF'}}/>
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
                  <CardSubtitle className="pl-2">Team leader</CardSubtitle>
                  <Chip
                    {...this.props}
                    userInfo={userId}
                  />
                  <br/>

                  <CardSubtitle className="pl-2">Members</CardSubtitle>
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


                  <div className="row">
                    <div className="col-md-12 pl-0">
                      <CardSubtitle>Introduction</CardSubtitle>
                      {team.description}
                    </div>
                  </div>

                  <div className="row mt-4">
                    <Button
                      onClick={() => this.navigate({
                        url: `/team/${team.id}/statistic`,
                        teamName: team.name
                      })}
                      type="dashed"
                      icon="pie-chart"
                    >
                      Statistic
                    </Button>
                  </div>

                  <div className="row mt-2">
                    <Button
                      onClick={() => this.navigate({
                        url: `/team/${team.id}/weekly-report`,
                        teamName: team.name
                      })}
                      type="dashed"
                      icon="book"
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

TeamDetail.propTypes = {};

export default TeamDetail;
