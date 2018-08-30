import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Button } from 'antd';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import WeeklyReportForm from '../WeeklyReportForm/index'

class WeeklyReportModal extends PureComponent {

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
      <Fragment>
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
      </Fragment>
    );
  }
}

WeeklyReportModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
  }).isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  createWeeklyReport: PropTypes.func.isRequired,
}

export default WeeklyReportModal;
