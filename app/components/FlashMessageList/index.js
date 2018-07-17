import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { deleteFlashMessage } from '../../containers/FlashMessage/actions'
import { selectFlashMessage } from "../../containers/FlashMessage/selectors";
import FlashMessage from "./FlashMessage";

class FlashMessageList extends Component {
  render() {
    const { deleteFlashMessage } = this.props;
    const messages = this.props.messages.map(message => (
      <FlashMessage
        key={message.id}
        message={message}
        deleteFlashMessage={deleteFlashMessage}
      />
    ));
    return (
      {messages}
    );
  }
}

FlashMessageList.propTypes = {
  // flashMessage: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: selectFlashMessage(state)
});

export default connect(
  mapStateToProps,
  { deleteFlashMessage }
)(FlashMessageList);
