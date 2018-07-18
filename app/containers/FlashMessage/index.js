import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectFlashMessage } from "./selectors";
import FlashMessage from "../../components/FlashMessage";
import { deleteFlashMessage } from './actions'

class FlashMessageList extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
  };

  render() {
    const { deleteFlashMessage, messages } = this.props;
    const flashMessages = messages.map(message => (
      <FlashMessage
        key={message.id}
        message={message}
        deleteFlashMessage={deleteFlashMessage}
      />
    ));
    return (
      <div>
        {flashMessages}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: selectFlashMessage(state)
});

export default connect(
  mapStateToProps,
  { deleteFlashMessage }
)(FlashMessageList);
