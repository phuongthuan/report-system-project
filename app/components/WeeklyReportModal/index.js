import React, { Component } from 'react';
import { Button } from 'antd';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import WeeklyReportForm from '../WeeklyReportForm/index'

class WeeklyReportModal extends Component {

  state = {
    modal: false
  }

  toggle = () => {
    const {modal} = this.state;
    this.setState({modal: !modal});
  }

  render() {
    const {user, addFlashMessage, createWeeklyReport} = this.props;
    return (
      <div>
        <Button
          icon="form"
          type="primary"
          onClick={this.toggle}
        >
          Create weekly report
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader>Weekly Report</ModalHeader>
          <ModalBody>
            <WeeklyReportForm
              user={user}
              addFlashMessage={addFlashMessage}
              toggle={this.toggle}
              createWeeklyReport={createWeeklyReport}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default WeeklyReportModal;
