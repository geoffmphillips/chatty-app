import React, {Component} from 'react';

class footer extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type Your Message and hit ENTER" />
      </footer>
    );
  }
}

export default footer;
