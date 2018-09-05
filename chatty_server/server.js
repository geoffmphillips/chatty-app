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
  wss.broadcast(JSON.stringify(wss.clients.size));

  ws.on('message', function incoming(data) {
    let message = JSON.parse(data);
    message.id = uuidv4();
    wss.broadcast(JSON.stringify(message));
  });
    
  ws.on('close', () => {
    console.log('Client disconnected')
    wss.broadcast(JSON.stringify(wss.clients.size))
  });
});
