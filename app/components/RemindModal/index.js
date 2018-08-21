import React, { Component, Fragment } from 'react';
import { Button } from 'antd'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import RemindForm from '../RemindForm/index'

class RemindModal extends Component {

  state = {
    modal: false
  }

  toggle = () => {
    const {modal} = this.state;
    this.setState({modal: !modal});
  }

  render() {
    const {addFlashMessage, createMessage, member, user} = this.props;
    return (
      <Fragment>
        <Button
          icon="notification"
          type="danger"
          onClick={this.toggle}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader>Quick message</ModalHeader>
          <ModalBody>
            <RemindForm
              toggle={this.toggle}
              addFlashMessage={addFlashMessage}
              createMessage={createMessage}
              member={member}
              user={user}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default RemindModal;
