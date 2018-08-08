import React from 'react';
import Message from './Message'

const MessagesList = ({messagesList, deleteMessage, addFlashMessage, ...props}) => (
  <div>
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
  </div>
);

export default MessagesList;
