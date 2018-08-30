import React, { Fragment } from 'react';
import Message from './Message'

const MessagesList = ({messagesList, deleteMessage, addFlashMessage, ...props}) => (
  <Fragment>
    {messagesList.map(message =>
      (
        <Message
          {...props}
          deleteMessage={deleteMessage}
          addFlashMessage={addFlashMessage}
          key={message.id}
          message={message}
        />
      ) )}
  </Fragment>
);

export default MessagesList;
