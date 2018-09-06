const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const colors = ['#BEB8EB', '#37737F', '#A7C98D', '#B34049'];

wss.on('connection', (ws) => {
  console.log('Client connected');
  let color = colors[Math.floor(Math.random() * colors.length)];
  let userConnectionUpdate = {
    color: color,
    numUsers: wss.clients.size,
  }
  // Sending updated number of users online to client-side on every connection
  wss.broadcast(JSON.stringify(userConnectionUpdate));
  
  ws.on('message', function incoming(data) {
    let message = JSON.parse(data);
    // Update message.type to acceptable type. Unsure of point of this - I originally set the correct state when message was sent from client. Changed to this due to assignment requirements
    switch(message.type) {
      case 'postNotification':
        message.type = 'incomingNotification';
        break;
      case 'postImage':
        message.type = 'incomingImage';
        break;
      default:
        message.type = 'incomingMessage';
        break;
    }

    message.id = uuidv4();
    wss.broadcast(JSON.stringify(message));
  });
  
  ws.on('close', () => {
    console.log('Client disconnected')
    let userDisconnectUpdate = {
      numUsers: wss.clients.size,
    }
    wss.broadcast(JSON.stringify(userDisconnectUpdate))
    // Sending updated number of users online to client-side on every disconnection
  });
});
