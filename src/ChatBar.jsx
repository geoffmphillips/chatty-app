import React from 'react';

function ChatBar(props) {
  const { sendNewMessage, currentUser, changeUsername, changeNewMessage, currentMessage } = props;

  const onUsernameChange = (event) => {
    changeUsername(event.target.value);
  }

  const onNewMessageChange = (event) => {
    changeNewMessage(event.target.value);
  }

  const onUsernameKeyDown = (event) => {
    let key = event.key;
    if(key === 'Enter') {
      let notificationMessage = {
        username: currentUser,
        content: ' changed their name',
        type: 'incomingNotification',
      }
      sendNewMessage(notificationMessage);
    }
  }

  const onMessageKeyDown = (event) => {
    let key = event.key;
    if(key === 'Enter') {
      let incomingMessage = {
        username: currentUser,
        content: currentMessage,
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
        onChange={ onUsernameChange } 
        name="username" 
        className="chatbar-username" 
        defaultValue={ currentUser } 
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
