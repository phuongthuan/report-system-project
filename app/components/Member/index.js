import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Card,
  CardBody,
  CardFooter,
} from 'reactstrap'
import img from '../../assests/images/Gabe_newell.png'
import WrapperRemindModal from '../RemindModal/index'

const Image = styled.img`
  width: 64px;
  height: 64px;
`;

class Member extends Component {

  render() {
    const {member, user, createMessage, addFlashMessage} = this.props;
    const {id, firstName, address, phone, lastName, avatar} = member;
    const image = member ? avatar : img;

    return (
      <Fragment>
        <Card
          className="mb-4 border-0 shadow-sm"
          style={{borderRadius: '0'}}
        >
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
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus
                odio
                <br/>
                <br/>
                <FontAwesomeIcon icon="address-book"/>&nbsp;{address}
                <br/>
                <FontAwesomeIcon icon="mobile-alt"/>&nbsp;{phone}
              </div>
            </div>
          </CardBody>
          {(user && (user.role === 'team_leader') || (user.role === 'group_leader')) &&
          (
            <CardFooter>
              <WrapperRemindModal
                addFlashMessage={addFlashMessage}
                createMessage={createMessage}
                member={member}
                user={user}
              />
            </CardFooter>
          )
          }
        </Card>
      </Fragment>
    );
  }
}

export default Member;
