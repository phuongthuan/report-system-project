import React, { Component } from 'react';
import isEmpty from "lodash/isEmpty";
import { Jumbotron, Button, UncontrolledCollapse, Card, CardBody } from 'reactstrap'
import Spinner from 'components/Spinner'
import PropTypes from 'prop-types';
import ReportsList from "../ReportsList";
import Member from "../Member";

class MemberDetail extends Component {

  render() {
    const {reportsList, loading, memberLoading, member } = this.props;
    return (
      <div>
        <Jumbotron className="py-2">
          <h1 className="display-4">{member.firstName} {member.lastName}</h1>
          <hr className="my-2"/>
          <br/>
          <div className="lead">
            <div>
              <Button className="mb-4" color="infor" id="toggler">
                More information
              </Button>
              <UncontrolledCollapse toggler="#toggler">
                <Member member={member} />
              </UncontrolledCollapse>
            </div>
          </div>
        </Jumbotron>

        {loading && isEmpty(reportsList) ? (
          <Spinner/>
        ) : (
          <ReportsList
            reportsList={reportsList}
          />
        )}
      </div>
    );
  }
}

MemberDetail.propTypes = {
  reportsList: PropTypes.array.isRequired,
  member: PropTypes.object,
};

export default MemberDetail;
