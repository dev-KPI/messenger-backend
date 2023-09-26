'use strict';

const http = require('node:http');
const { HEADERS } = require('../headers.js');

const parseBody = async (req) => {
  const buffer = [];
  for await (const chunk of req) buffer.push(chunk);
  const data = Buffer.concat(buffer).toString();
  return JSON.parse(data);
};

module.exports = (routing, port, console) => {
  http
    .createServer(async (req, res) => {
      res.writeHead(200, HEADERS);
      if (req.method !== 'POST') return void res.end('"Not found"');
      const { url, socket } = req;
      const [name, method] = url.substring(1).split('/');
      const entity = routing[name];
      if (!entity) return void res.end('Not found');
      const handler = entity[method];
      if (!handler) return void res.end('Not found');
      const body = await parseBody(req);
      console.log(`${socket.remoteAddress} ${method} ${url}`);
      const result = await handler(...body);
      res.end(JSON.stringify(result));
    })
    .listen(port);
  console.log('Native HTTP 🔌');
};
