import React, {Component} from 'react';
import Footer from 'ChatBar.jsx';
import Message from 'Message.jsx';

function Header = () => {
  <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
  </nav>
}

class App extends Component {
  render() {
    return (
      <Header />
      <Footer />
    );
  }
}
export default App;
