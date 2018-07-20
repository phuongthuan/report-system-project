import React, { Component, Fragment } from 'react';
import { Button, Image, Card, CardBody} from 'reactstrap'
import img from '../../assests/images/Gabe_newell.png'

class Message extends Component {
  render() {
    const { message }= this.props;
    console.log(message);
    return (
      <Fragment>
        <Card className="mb-3">
          <CardBody>
            <div className="media">
              {/*<Link to={`member/${id}`}>*/}
                {/*<Image className="mr-3 rounded-circle" src={image} alt="Member Profile img"/>*/}
              {/*</Link>*/}
              <div className="media-body">
                {/*<h5 className="mt-0">*/}
                  {/*<Link to={`member/${id}`}>*/}
                    {/*{firstName} {lastName}*/}
                  {/*</Link>*/}
                {/*</h5>*/}
                <p>{message.title}</p>
                <p>{message.message}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

export default Message;
