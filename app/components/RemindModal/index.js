import React, { Component, Fragment } from 'react';
import { Modal, Button, Form, Input } from 'antd'
import moment from "moment/moment";

const FormItem = Form.Item;
const { TextArea } = Input;

class RemindModal extends Component {

  state = {
    messageObj: {
      userId: this.props.user.id,
      toUser: this.props.member.id,
      date: moment().toString()
    },
    visible: false,
    loading: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { createMessage } = this.props;
    const { messageObj } = this.state;
    this.setState({ loading: true });

    this.props.form.validateFields((err, values) => {
      if (!err) {
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
          const message = {
            userId: messageObj.userId,
            toUser: messageObj.toUser,
            title: values.title,
            message: values.message,
            date: messageObj.date
          }
          createMessage(message);
        }, 2000);
      }
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Button
          icon="notification"
          type="danger"
          onClick={this.showModal}
        >
          Remind
        </Button>

        <Modal
          visible={this.state.visible}
          title="Quick message to member"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleSubmit}>
              Sent
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input title!' }],
              })(
                <Input
                  autoComplete="off"
                  placeholder="Title"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('message', {
                rules: [{ required: true, message: 'Please input message!' }],
              })(
                <TextArea
                  autoComplete="off"
                  placeholder="Leave a message ..."
                  rows={4}
                />
              )}
            </FormItem>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

const WrapperRemindModal = Form.create()(RemindModal);
export default WrapperRemindModal;
