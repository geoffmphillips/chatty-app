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

wss.on('connection', (ws) => {
  console.log('Client connected');
  // Sending updated number of users online to client-side on every connection
  wss.broadcast(JSON.stringify(wss.clients.size));
  
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
    wss.broadcast(JSON.stringify(wss.clients.size))
    // Sending updated number of users online to client-side on every disconnection
  });
});
