import React from 'react';
import { ListGroup, ListGroupItem, Badge, Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';
import imageProfile from '../../assests/images/Gabe_newell.png';

const SideBar = () => {
  return (
    <ListGroup>
      <ListGroupItem
        className="justify-content-between"
      >
        <CardImg top width="100%" src={imageProfile} alt="Card image cap"/>
        <CardBody>
          <CardTitle>Gabe Newell</CardTitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This
            content is a little bit longer.
          </CardText>
          <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardBody>
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="justify-content-between">Reports <Badge pill>14</Badge></ListGroupItem>
      <ListGroupItem tag="a" href="#" className="justify-content-between">Edit Profile <Badge pill>2</Badge>
      </ListGroupItem>
      <ListGroupItem tag="a" href="#" className="justify-content-between">Logout <Badge pill>1</Badge></ListGroupItem>
    </ListGroup>
  );
};

export default SideBar;
