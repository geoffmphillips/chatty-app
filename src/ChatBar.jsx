import React from 'react';

function ChatBar(props) {
  const { sendNewMessage, currentUser, changeUsername } = props;

  const onUsernameKeyDown = (event) => {
    // Temporarily storing new username for message content before setting App state's currentuser to the new username
    let newUsername = event.target.value;
    let key = event.key;
    if (key === 'Enter') {
      // Set displayed username to Anonymous if user hasn't entered a username
      let user = currentUser || 'Anonymous';
      let notificationMessage = {
        username: newUsername,
        content: user + ' changed their name to ' + newUsername,
        type: 'postNotification',
      }
      sendNewMessage(notificationMessage);
      changeUsername(newUsername);
    }
  }

  const onMessageKeyDown = (event) => {
    let key = event.key;
    if(key === 'Enter') {
      let incomingMessage = {
        // Set displayed username to Anonymous if user hasn't entered a username
        username: currentUser || 'Anonymous',
        content: event.target.value,
        type: 'postMessage',
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
        name="message" 
        className="chatbar-message" 
        placeholder="Type a message and hit ENTER" 
      />
    </footer>
  )
}

export default ChatBar;
