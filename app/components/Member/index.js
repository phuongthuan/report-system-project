import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ButtonGroup,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Input
} from 'reactstrap'
import img from '../../assests/images/Gabe_newell.png'

const Image = styled.img`
  width: 64px;
  height: 64px;
`;

class Member extends Component {

  state = {
    modal: false,
    messageObj: {
      userId: this.props.user.id,
      toUser: this.props.member.id,
      title: '',
      message: '',
      date: moment().toString()
    }
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const {modal, messageObj} = this.state;
    const {createMessage, addFlashMessage} = this.props;
    this.setState({
      modal: !modal
    });
    createMessage(messageObj);
    addFlashMessage({
      type: 'success',
      text: 'Message was sent'
    });
  }

  onHandleFormChange = (e) => {
    const {messageObj} = this.state;
    this.setState({
      messageObj: {
        ...messageObj,
        [e.target.name]: e.target.value
      }
    });
  }

  toggle = () => {
    const {modal} = this.state;
    this.setState({
      modal: !modal
    });
  }

  render() {
    const {messageObj} = this.state;
    const {member, user} = this.props;
    const {id, firstName, address, phone, lastName, avatar} = member;
    const image = member ? avatar : img;
    return (
      <Fragment>
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
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus
                odio,
                vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                Donec
                lacinia congue felis in faucibus.
                <br/>
                <br/>
                <FontAwesomeIcon icon="address-book"/>&nbsp;{address}
                <br/>
                <FontAwesomeIcon icon="mobile-alt"/>&nbsp;{phone}
              </div>
            </div>
          </CardBody>
          {(user && user.role === 'team_leader' || user.role === 'group_leader') &&
          (
            <CardFooter>
              <ButtonGroup>
                <Button
                  size="sm"
                  color="warning"
                  onClick={this.toggle}
                >
                  Remind
                </Button>
              </ButtonGroup>
            </CardFooter>
          )
          }
        </Card>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <Form onSubmit={this.onSubmitForm}>
            <ModalHeader toggle={this.toggle}>Remind member</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  name="title"
                  autoComplete="off"
                  bsSize="sm"
                  value={messageObj.title}
                  placeholder="Title..."
                  onChange={this.onHandleFormChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  style={{height: '100px'}}
                  type="textarea"
                  name="message"
                  bsSize="sm"
                  value={messageObj.message}
                  placeholder="Leave a message ..."
                  onChange={this.onHandleFormChange}
                  required
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                required
              >Sent
              </Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default Member;
