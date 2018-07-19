import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody } from 'reactstrap'
import img from '../../assests/images/Gabe_newell.png'

const Image = styled.img`
  width: 64px;
  height: 64px;
`;

const Member = (props) => {
  const { id, firstName, address, phone, lastName, avatar } = props.member;
  const image = props.member ? avatar : img;
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="media">
          <Link to={`member/${id}`}>
            <Image className="mr-3 rounded-circle" src={image} alt="Member Profile img"/>
          </Link>
          <div className="media-body">
            <h5 className="mt-0">
              <Link to={`member/${id}`}>
                {firstName} {lastName}
              </Link>
            </h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
            vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
            lacinia congue felis in faucibus.
            <br/>
            <br/>
            <FontAwesomeIcon icon="address-book" />&nbsp;{address}
            <br/>
            <FontAwesomeIcon icon="mobile-alt" />&nbsp;{phone}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}


export default Member;
