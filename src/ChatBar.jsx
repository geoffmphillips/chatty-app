import React from 'react';

const ChatBar = (props) => {
  function onSubmit(event) {
    event.preventDefault();

    const message = event.target.elements.message;
    props.addNewMessage(props.currentUser, message.value);
    console.log(message)
    message.value = '';
  }

  return (
    <footer className="chatbar">
      <form onSubmit={ onSubmit }>
        <input className="chatbar-username" defaultValue={ props.currentUser } placeholder="Your Name (Optional)" />
        <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </form>
    </footer>
  )
}

export default ChatBar;
