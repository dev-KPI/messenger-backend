'use strict';

const fastify = require('fastify')();
const start = require('./start.js');
const handler = require('../ws-handler.js');

const setup = async (routing) => {
  fastify.register(async (fastify) => {
    fastify.get('*', { websocket: true }, ({ socket }) => {
      socket.on('message', (message) =>
        handler({ routing, socket, console, message })
      );
    });
  });
};

module.exports = async (routing, port, console) => {
  fastify.register(require('@fastify/websocket'));
  await setup(routing);
  await start(fastify, port, console);
  console.log('🔌 Fastify WS');
};
