import React from 'react';

const buttonStyle = {
  height: '0px', 
  width: '0px', 
  border: 'none', 
  padding: '0px'
}

function ChatBar(props) {
  function onSubmit(event) {
    event.preventDefault();
    const message = event.target.elements.message;
    const username = event.target.elements.username.value;
    props.addNewMessage(username, message.value);
    message.value = '';
  }

  return (
    <footer className="chatbar">
      <form onSubmit={ onSubmit } >
        <input name="username" className="chatbar-username" defaultValue={ props.currentUser } placeholder="Your Name (Optional)" />
        <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        <input type="submit" style={buttonStyle} display="hidden" />
      </form>
    </footer>
  )
}

export default ChatBar;
