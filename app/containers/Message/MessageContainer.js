import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import isEmpty from "lodash/isEmpty";
import PropTypes from 'prop-types';
import styled from "styled-components";
import SideBar from 'components/SideBar'
import Spinner from 'components/Spinner'
import MessagesList from '../../components/MessagesList/index'
import { selectMessageLoading, selectMessages } from "./selectors";
import { deleteMessage, fetchAllMessages } from "./actions";
import { selectUser } from "../Auth/selectors";
import { addFlashMessage } from "../FlashMessage/actions";

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
`;

class MessageContainer extends Component {

  componentDidMount() {
    const { fetchAllMessages, user } = this.props;
    if (user && user.role === 'member') {
      fetchAllMessages(user.id);
    }
  }

  render() {
    const { messages, loading, deleteMessage, addFlashMessage } = this.props;
    return (
      <Wrapper>
        <div className="row">
          <div className="col-md-12">
            {loading && isEmpty(messages) ? (
              <Spinner height="650px" style={{fontSize: 32}}/>
            ) : (
              <Fragment>
                {messages.length === 0 ? (
                  <p className="d-flex justify-content-center display-4">No message</p>
                ) : (
                  <MessagesList
                    {...this.props}
                    addFlashMessage={addFlashMessage}
                    deleteMessage={deleteMessage}
                    messagesList={messages}
                  />
                )}
              </Fragment>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
}

MessageContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  fetchAllMessages: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  messages: selectMessages(state),
  loading: selectMessageLoading(state),
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllMessages: payload => dispatch(fetchAllMessages(payload)),
  deleteMessage: id => dispatch(deleteMessage(id)),
  addFlashMessage: message => dispatch(addFlashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
