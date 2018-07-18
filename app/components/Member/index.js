import React from 'react';
import styled from 'styled-components'
import { Card, CardBody } from 'reactstrap'
import img from '../../assests/images/Gabe_newell.png'

const Image = styled.img`
  width: 64px;
  height: 64px;
`;

const Member = () => (
  <Card>
    <CardBody>
      <div className="media">
        <Image className="mr-3 rounded-circle" src={img} alt="Generic placeholder"/>
        <div className="media-body">
          <h5 className="mt-0">Gaben Newell</h5>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
          vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
          lacinia congue felis in faucibus.
        </div>
      </div>
    </CardBody>
  </Card>
);


export default Member;
