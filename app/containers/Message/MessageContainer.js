import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import isEmpty from "lodash/isEmpty";
import PropTypes from 'prop-types';
import styled from "styled-components";
import SideBar from 'components/SideBar'
import Spinner from 'components/Spinner'
import MessagesList from '../../components/MessagesList/index'
import { selectMessageLoading, selectMessages } from "./selectors";
import { fetchAllMessages } from "./actions";
import { selectUser } from "../Auth/selectors";

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
`;

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
      <Wrapper>
        <div className="row">
          <div className="col-md-4">
            <SideBar/>
          </div>
          <div className="col-md-8">
            {loading && isEmpty(messages) ? (
              <Spinner />
            ) : (
              <Fragment>
                {messages.length === 0 ? (
                  <h4>No message</h4>
                ) : (
                  <MessagesList
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
