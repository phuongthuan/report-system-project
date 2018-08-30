import React, { PureComponent, Fragment } from 'react'
import moment from 'moment'
import { CardText, Card, CardBody } from 'reactstrap'
import Chip from '../Chip/index'

class Message extends PureComponent {

  onDeleteMessage = () => {
    const {deleteMessage, addFlashMessage, message} = this.props;
    deleteMessage(message.id);
    addFlashMessage({
      type: 'success',
      text: 'Message has been deleted.'
    });
  }

  render() {
    const {message} = this.props;
    const {userId} = message;
    return (
      <Fragment>
        <Card
          className="mb-3 border-0 shadow-sm"
          style={{borderRadius: '0'}}
        >
          <CardBody>
            <div className="media">
              <div className="media-body">
                <button
                  onClick={this.onDeleteMessage}
                  className="close"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <Chip
                  {...this.props}
                  userInfo={userId}
                />
                <CardText>
                  <small className="text-muted">
                    Sent from {moment(message.date).format("dddd, MMMM Do YYYY")}
                  </small>
                </CardText>

                <hr/>
                <CardText>
                  {message.title}
                </CardText>
                <CardText>
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
