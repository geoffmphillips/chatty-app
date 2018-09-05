import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  )
}

class App extends Component {
  constructor() {
    super();
    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeNewMessage = this.changeNewMessage.bind(this);
    this.state = {
      currentUser: "Anonymous",
      currentMessage: "",
      messages: [
        {
        id: 1,
          type: 'incomingMessage',
          content: 'I won\'t be impressed with technology until I can download food.',
          username: 'Anonymous1'
        },
        {
          id: 2,
          type: 'incomingNotification',
          content: 'Anonymous1 changed their name to nomnom',
        },
        {
          id: 3,
          type: 'incomingMessage',
          content: 'I wouldn\'t want to download Kraft Dinner. I\'d be scared of cheese packet loss.',
          username: 'Anonymous2'
        },
        {
          id: 4,
          type: 'incomingMessage',
          content: '...',
          username: 'nomnom'
        },
        {
          id: 5,
          type: 'incomingMessage',
          content: 'I\'d love to download a fried egg, but I\'m afraid encryption would scramble it',
          username: 'Anonymous2'
        },
        {
          id: 6,
          type: 'incomingMessage',
          content: 'This isn\'t funny. You\'re not funny',
          username: 'nomnom'
        },
        {
          id: 7,
          type: 'incomingNotification',
          content: 'Anonymous2 changed their name to NotFunny',
        },
      ]
    }
  }

  addNewMessage(username, content) {
    const newMessage = {
      username: username,
      content: content,
    }

    const jsonMessage = JSON.stringify(newMessage);
    this.socket.send(jsonMessage);
  }

  changeUsername(username) {
    this.setState({
      currentUser: username,
    })

  }

  changeNewMessage (message) {
    this.setState({
      currentMessage: message,
    })
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (event) => {

      let message = JSON.parse(event.data);
      message.type = 'incomingMessage';
      this.setState( { messages: this.state.messages.concat(message) }
    )
  }
}
  
  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={ this.state.messages }/>
        <ChatBar 
          currentUser={ this.state.currentUser }
          currentMessage={ this.state.currentMessage } 
          changeUsername={ this.changeUsername } 
          changeNewMessage={ this.changeNewMessage } 
          addNewMessage={ this.addNewMessage }
        />
      </div>
    );
  }
}
export default App;
