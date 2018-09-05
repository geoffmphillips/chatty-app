import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// Decides if text should say "x user online" or "x users online"
const userOrUsers = (num) => {
  let output = 'users';

  if (num === 1) {
    output = 'user';
  }

  return output;
}

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p>{props.numUsers} {userOrUsers(props.numUsers)} online</p>
    </nav>
  )
}

class App extends Component {
  constructor() {
    super();

    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeNewMessage = this.changeNewMessage.bind(this);

    this.state = {
      numUsers: 0,
      currentUser: "Anonymous",
      currentMessage: "",
      messages: [],
    }
  }

  sendNewMessage(messageObj) {
    const jsonMessage = JSON.stringify(messageObj);
    this.socket.send(jsonMessage);
  }

  changeUsername(username) {
    this.setState({
      currentUser: username,
    });
  }

  changeNewMessage (message) {
    this.setState({
      currentMessage: message,
    })
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      if (typeof data === 'number') {
        this.setState({ 
          numUsers: data
        })
        
      } else {
        this.setState( { messages: this.state.messages.concat(data) })
      }
    }
  }
  
  render() {
    return (
      <div>
        <Navbar numUsers={ this.state.numUsers } />
        <MessageList messages={ this.state.messages }/>
        <ChatBar 
          currentUser={ this.state.currentUser }
          currentMessage={ this.state.currentMessage } 
          changeUsername={ this.changeUsername } 
          changeNewMessage={ this.changeNewMessage } 
          sendNewMessage={ this.sendNewMessage }
        />
      </div>
    );
  }
}
export default App;
