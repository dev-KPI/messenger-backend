'use strict';

const { Server } = require('ws');
const handler = require('../ws-handler.js');

module.exports = (routing, port, console) => {
  const ws = new Server({ port });
  ws.on('connection', (socket) => {
    socket.on('message', async (message) =>
      handler({ routing, socket, console, message })
    );
  });
  console.log('🔌 Native WS');
};
