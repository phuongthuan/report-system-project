import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  CardBody,
  CardTitle,
  CardText,
  CardImg
} from 'reactstrap';
import { Link } from 'react-router-dom'
import imageProfile from '../../assests/images/Gabe_newell.png';

const SideBar = () => (
  <ListGroup className="shadow-sm">
    <ListGroupItem className="justify-content-between text-center">
      <CardImg src={imageProfile} alt="Card image cap"/>
      <CardBody>
        <CardTitle>Gabe Newell</CardTitle>
        <CardText>
          <small className="text-muted">
            <Link to="/profile">
              Edit Profile
            </Link>
          </small>
        </CardText>
      </CardBody>
    </ListGroupItem>
    <ListGroupItem
      className="justify-content-between"
      action
    >
      <Link to="/report/create">
        Write Daily Report
      </Link>
    </ListGroupItem>
    <ListGroupItem
      className="justify-content-between"
      action
    >
      <Link to="/report">
        Reports
      </Link>
    </ListGroupItem>
    <ListGroupItem tag="a" className="justify-content-between" action>Logout</ListGroupItem>
  </ListGroup>
);

export default SideBar;
