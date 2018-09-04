import React, {Component} from 'react';

const Message = ({ message }) => {
  return (
      <div className="message">
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
  )
}

export default Message;
