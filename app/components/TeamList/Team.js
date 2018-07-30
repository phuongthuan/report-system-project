import React, { Component, Fragment } from 'react';
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import styled from "styled-components";
import img from '../../assests/images/Gabe_newell.png'

const Image = styled.img`
  width: 64px;
  height: 64px;
`;

class Team extends Component {

  render() {
    const { team } = this.props;
    const {id, name, userId, description} = team;
    const image = userId ? userId.avatar : img;
    return (
      <Fragment>
        <Card
          className="mb-4 border-0 shadow-sm"
          style={{borderRadius: '0'}}
        >
          <CardBody>
            <div className="media">
              <Link to={`member/${userId.id}`}>
                <Image className="mr-3 rounded-circle" src={image} alt={userId.firstName}/>
              </Link>
              <div className="media-body">
                <h5 className="mt-0">
                  <Link to={`team/${id}`}>
                    {name}
                  </Link>
                </h5>
                {description}
                <br/>
                <br/>
              </div>
            </div>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

Team.propTypes = {};

export default Team;
