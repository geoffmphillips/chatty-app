import React from 'react';

function ChatBar(props) {
  const { sendNewMessage, currentUser, changeUsername, changeNewMessage, currentMessage } = props;

  const onNewMessageChange = (event) => {
    changeNewMessage(event.target.value);
  }

  const onUsernameKeyDown = (event) => {
    let newUsername = event.target.value;
    let key = event.key;
    if(key === 'Enter') {
      let user = currentUser || 'Anonymous';
      let notificationMessage = {
        username: newUsername,
        content: user + ' changed their name to ' + newUsername,
        type: 'incomingNotification',
      }
    sendNewMessage(notificationMessage);
    changeUsername(event.target.value);
    }
  }

  const onMessageKeyDown = (event) => {
    let key = event.key;
    if(key === 'Enter') {
      let incomingMessage = {
        username: currentUser || 'Anonymous',
        content: event.target.value,
        type: 'incomingMessage',
      }
      sendNewMessage(incomingMessage);
      event.target.value = '';
    }
  }

  return (
    <footer className="chatbar">
      <input 
        onKeyDown={ onUsernameKeyDown }
        name="username" 
        className="chatbar-username" 
        defaultValue=''
        placeholder="Your Name (Optional)" 
        />
      <input 
        onKeyDown={ onMessageKeyDown }
        onChange={ onNewMessageChange } 
        name="message" 
        className="chatbar-message" 
        placeholder="Type a message and hit ENTER" 
      />
    </footer>
  )
}

export default ChatBar;
