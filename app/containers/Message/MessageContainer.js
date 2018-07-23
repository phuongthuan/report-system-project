import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from "lodash/isEmpty";
import PropTypes from 'prop-types';
import SideBar from 'components/SideBar'
import Spinner from 'components/Spinner'
import MessagesList from '../../components/MessagesList/index'
import { selectMessageLoading, selectMessages } from "./selectors";
import { fetchAllMessages } from "./actions";
import { selectUser } from "../Auth/selectors";

class MessageContainer extends Component {

  componentDidMount() {
    const { fetchAllMessages, user } = this.props;
    if (user) {
      fetchAllMessages(user.id);
    }
  }

  render() {
    const { messages, loading } = this.props;
    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar/>
        </div>
        {messages.length === 0 ? (
          <h4>No message</h4>
        ) : (
          <div className="col-md-8">
            {loading && isEmpty(messages) ? (
              <Spinner />
            ) : (
              <MessagesList
                messagesList={messages}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

MessageContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  fetchAllMessages: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  messages: selectMessages(state),
  loading: selectMessageLoading(state),
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllMessages: payload => dispatch(fetchAllMessages(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
