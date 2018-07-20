import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from "lodash/isEmpty";
import PropTypes from 'prop-types';
import SideBar from 'components/SideBar'
import Spinner from 'components/Spinner'
import MessagesList from '../../components/MessagesList/index'
import { selectMembersRelatedToMessage, selectMessageLoading, selectMessages } from "./selectors";
import { fetchAllMembersRelatedToMessage, fetchAllMessages } from "./actions";
import { selectUser } from "../Auth/selectors";

class MessageContainer extends Component {

  componentDidMount() {
    const { fetchAllMessages, user, fetchAllMembersRelatedToMessage } = this.props;
    fetchAllMessages(user.id);
    fetchAllMembersRelatedToMessage(user.id);
  }

  render() {
    const { messages, loading } = this.props;
    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar/>
        </div>
        <div className="col-md-8">
          {loading && isEmpty(messages) ? (
            <Spinner />
          ) : (
            <MessagesList
              messagesList={messages}
            />
          )}
        </div>
      </div>
    );
  }
}

MessageContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  membersRelatedToMessage: PropTypes.arrayOf(PropTypes.object),
  fetchAllMessages: PropTypes.func,
  fetchAllMembersRelatedToMessage: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  messages: selectMessages(state),
  loading: selectMessageLoading(state),
  user: selectUser(state),
  membersRelatedToMessage: selectMembersRelatedToMessage(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllMessages: payload => dispatch(fetchAllMessages(payload)),
  fetchAllMembersRelatedToMessage: payload => dispatch(fetchAllMembersRelatedToMessage(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
