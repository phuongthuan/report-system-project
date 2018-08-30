import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody } from 'reactstrap'
import img from '../../assests/images/Gabe_newell.png'
import RemindModal from "../RemindModal";
import TagBox from '../TagBox/index'

const Image = styled.img`
  width: 64px;
  height: 64px;
`;

class Member extends PureComponent {

  render() {
    const {member, user, createMessage, addFlashMessage} = this.props;
    const {id, firstName, phone, lastName, avatar, role, division} = member;
    const image = member ? avatar : img;

    return (
      <Fragment>
        <Card className="mb-3 border-0 shadow-sm">
          <CardBody>
            <div className="media">
              <Link to={`member/${id}`}>
                <Image className="mr-3 rounded-circle" src={image} alt="Member Profile img"/>
              </Link>
              <div className="media-body">
                <div
                  className="close"
                  aria-label="Close"
                >
                  {(user && (user.role === 'team_leader') || (user.role === 'group_leader')) &&
                  (
                    <RemindModal
                      addFlashMessage={addFlashMessage}
                      createMessage={createMessage}
                      member={member}
                      user={user}
                    />
                  )
                  }
                </div>

                <h5 className="mt-0">
                  <Link to={`member/${id}`}>
                    {firstName} {lastName}
                  </Link>
                </h5>

                <div>
                  <TagBox
                    color="volcano"
                    name={
                      (() => {
                        switch (role) {
                          case "member":
                            return "Member";
                          case "team_leader":
                            return "Team leader";
                          case "group_leader":
                            return "Group leader";
                          default:
                            return "Member";
                        }
                      })()
                    }
                  />
                  &nbsp;
                  <TagBox
                    color="green"
                    name={division}
                  />
                </div>
                <br/>
                <FontAwesomeIcon icon="mobile-alt"/>&nbsp;{phone}
              </div>
            </div>
          </CardBody>

        </Card>
      </Fragment>
    );
  }
}

export default Member;
