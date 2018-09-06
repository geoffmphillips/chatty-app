import React from 'react';

function ChatBar(props) {
  const { sendNewMessage, currentUser, changeUsername } = props;

  const onUsernameKeyDown = (event) => {
    // Temporarily storing new username for message content before setting App state's currentuser to the new username
    let newUsername = event.target.value;
    let key = event.key;
    if (key === 'Enter') {
      if (newUsername === currentUser) {
        // Lazy error handling
      } else {
        let user = currentUser || 'Anonymous';
        let postNotification = {
          username: newUsername,
          content: user + ' changed their name to ' + newUsername,
          type: 'postNotification',
        }
        sendNewMessage(postNotification);
        changeUsername(newUsername);
      }
    }
  }

  const onMessageKeyDown = (event) => {
    let key = event.key;
    // Regex to test that message is url ending in png/jpg/gif
    const urlTest = RegExp('(https:?\/\/)?(www\.)?.+\.(png|jpe?g|gif)');
    if(key === 'Enter') {
      if (event.target.value === '') {
         // Lazy error handling
      } else if (urlTest.test(event.target.value)) {
        let postImage = {
          username: currentUser || 'Anonymous',
          type: 'postImage',
          content: event.target.value,
        }
        sendNewMessage(postImage);
        event.target.value = '';
      } else {
        let postMessage = {
          username: currentUser || 'Anonymous',
          content: event.target.value,
          type: 'postMessage',
        }
        sendNewMessage(postMessage);
        event.target.value = '';
      }
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
