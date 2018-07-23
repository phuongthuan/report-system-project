import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardText, Card, CardBody} from 'reactstrap'

class Message extends Component {
  render() {
    const { message }= this.props;
    const { userId } = message;
    return (
      <Fragment>
        <Card className="mb-3">
          <CardBody>
            <div className="media">
              <div className="media-body">
                <CardText>
                  <small className="text-muted"><FontAwesomeIcon icon="envelope"/>&nbsp;
                    Message from:&nbsp;&nbsp;
                    <Link to={`member/${userId.id}`}>
                      {userId.firstName} {userId.lastName}
                    </Link>
                  </small>
                </CardText>

                <CardText>
                  {message.title}
                  {message.message}
                </CardText>
              </div>
            </div>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

export default Message;
