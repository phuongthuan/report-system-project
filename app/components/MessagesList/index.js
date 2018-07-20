import React from 'react';
import Message from './Message'

const MessagesList = ({ messagesList }) => {
  return (
    <div>
      {messagesList.map(message =>
        (
          <Message
            key={message.id}
            message={message}
          />
        ) )}
    </div>
  );
};

export default MessagesList;
