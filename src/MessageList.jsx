import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const incomingMessages = this.props.messages.filter(message => message.type === "incomingMessage");
    const messages = incomingMessages.map(message => {
      return (<Message key={message.id} message={message} />)
    })
    return (
      <main className="messages">
        {messages}
      </main>
    )
  }
}

export default MessageList;
