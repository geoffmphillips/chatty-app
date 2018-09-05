import React from 'react';

function ChatBar(props) {
  const { addNewMessage, currentUser, changeUsername, changeNewMessage, currentMessage } = props;
  function onSubmit(event) {
    event.preventDefault();
    const message = event.target.elements.message;
    const username = event.target.elements.username.value;
    addNewMessage(username, message.value);
    message.value = '';
  }

  const onUsernameChange = (event) => {
    changeUsername(event.target.value);
  }

  const onNewMessageChange = (event) => {
    changeNewMessage(event.target.value);
  }

  const onUsernameKeyDown = (event) => {
    let key = event.key;
    if(key === 'Enter') {
      addNewMessage(currentUser, ' changed their name');
    }
  }

  const onMessageKeyDown = (event) => {
    let key = event.key;
    if(key === 'Enter') {
      addNewMessage(currentUser, currentMessage)
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
