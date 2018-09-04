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

const generateRandomId = () => {
  let output = '';
  const alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < 6; i++) {
    output += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
  }

  return output;
}

class App extends Component {
  constructor() {
    super();
    this.addNewMessage = this.addNewMessage.bind(this);
    this.state = {
      loading: true,
      currentUser: "Anonymous",
      // messages: [],
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
      id: generateRandomId(),
      type: 'incomingMessage',
      username: username,
      content: content,
    }

    this.setState({
      messages: this.state.messages.concat(newMessage)
    });
  }

  updateUsername(username) {
    this.setState({
      currentUser: username,
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <Navbar />
        { this.state.loading ? 'Now loading...' : <MessageList messages={ this.state.messages }/> }
        <ChatBar currentUser={ this.state.currentUser } addNewMessage={ this.addNewMessage } />
      </div>
    );
  }
}
export default App;
