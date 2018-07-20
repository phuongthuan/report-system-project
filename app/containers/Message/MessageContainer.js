import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectMessages } from "./selectors";
import { fetchAllMessages } from "./actions";
import { selectUser } from "../Auth/selectors";

class MessageContainer extends Component {

  componentDidMount() {
    const { fetchAllMessages, user } = this.props;
    fetchAllMessages(user.id);
  }

  render() {
    const { messages } = this.props;
    console.log(messages);
    return (
      <div>
        Message Container.
      </div>
    );
  }
}

MessageContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  fetchAllMessages: PropTypes.func
};

const mapStateToProps = state => ({
  messages: selectMessages(state),
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllMessages: payload => dispatch(fetchAllMessages(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
