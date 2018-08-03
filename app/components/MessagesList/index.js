import React from 'react';
import Message from './Message'

const MessagesList = ({ messagesList, deleteMessage, addFlashMessage }) => (
  <div>
    {messagesList.map(message =>
      (
        <Message
          deleteMessage={deleteMessage}
          addFlashMessage={addFlashMessage}
          key={message.id}
          message={message}
        />
      ) )}
  </div>
);

export default MessagesList;
