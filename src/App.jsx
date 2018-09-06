import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const userOrUsers = (num) => {
  let output = 'users';

  if (num === 1) {
    output = 'user';
  }

  return output;
}

const Navbar = (props) => {
  const { numUsers } = props;
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p>{numUsers} {userOrUsers(numUsers)} online</p>
    </nav>
  )
}

class App extends Component {
  constructor() {
    super();

    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);

    this.state = {
      numUsers: 0,
      currentUser: {
        name: '',
        color: '#000',
      },
      messages: [
        {
          type: 'incomingNotification',
          content: 'Welcome to Chatty! Enter your name or start chatting',
          id: '0',
        }
      ],
    }
  }

  sendNewMessage(messageObj) {
    const jsonMessage = JSON.stringify(messageObj);
    this.socket.send(jsonMessage);
  }

  changeUsername(username) {
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        name: username,
      },
    }));
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      // Handling if the message from server is an update to users online (number) or a new message
      if (data.hasOwnProperty('numUsers')) {
        this.setState({
          numUsers: data.numUsers,
          }
        );
      } else if (data[0] === '#') {
      this.setState(prevState => ({
        currentUser: {
          ...prevState.currentUser,
          color: data,
        }
      }));
      } else {
      this.setState( { messages: this.state.messages.concat(data) })
    }
  }
}
  
  render() {
    return (
      <div>
        <Navbar numUsers={ this.state.numUsers } />
        <MessageList messages={ this.state.messages } usernameColor={ this.state.currentUser.color } />
        <ChatBar 
          currentUser={ this.state.currentUser }
          changeUsername={ this.changeUsername } 
          sendNewMessage={ this.sendNewMessage }
        />
      </div>
    );
  }
}
export default App;
