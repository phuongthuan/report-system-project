import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { deleteFlashMessage } from '../../containers/FlashMessage/actions'
import { selectFlashMessage } from "../../containers/FlashMessage/selectors";
import FlashMessage from "./FlashMessage";

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
