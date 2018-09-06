import React from 'react';

// Displays different html/style depending on message type
const Message = ({ message }) => {
  let displayMessage; 
  
  switch (message.type) {
    case 'incomingNotification':
      displayMessage = 
        (
          <div className="notification">
            <span className="notification-content">{ message.content }</span>
          </div>
        )
      break;
    case 'incomingImage':
      displayMessage = 
        (
          <div className="message">
            <span className="message-username">{ message.username }</span>
            <div className="message-content">
              <img src={ message.content } />
            </div>
          </div>
        )
      break;
    default:
      displayMessage = 
        (
          <div className="message">
            <span className="message-username">{ message.username }</span>
            <span className="message-content">{ message.content }</span>
          </div> 
        )
      break;
  }

  return (
    <div>
      { displayMessage }
    </div>
  )
}

export default Message;
