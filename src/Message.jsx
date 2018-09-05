import React from 'react';

const Message = ({ message }) => {
  const displayMessage = (message.type === 'incomingMessage') ? (
    <div className="message">
      <span className="message-username">{ message.username }</span>
      <span className="message-content">{ message.content }</span>
    </div> 
  ) : ( 
    <div className="notification">
      <span className="notification-content">{ message.content }</span>
    </div>
  )

  return (
    <div>
      { displayMessage }
    </div>
  )
}

export default Message;
