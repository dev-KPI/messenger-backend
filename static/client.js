'use strict';

const url = new URL('http://localhost:8001');
const structure = {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
};

const createRequestWs = (socket) => async (serviceName, methodName, args) =>
  new Promise((resolve) => {
    const packet = { name: serviceName, method: methodName, args };
    socket.send(JSON.stringify(packet));
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      resolve(data);
    };
  });

const createRequestHttp = (url) => async (serviceName, methodName, args) => {
  const path = `${serviceName}/${methodName}`;
  const response = await fetch(new URL(path, url), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  if (response.ok) return await response.json();
  throw new Error(`${response.url} ${response.statusText}`);
};

const requests = {
  'ws:': (url) => createRequestWs(new WebSocket(url)),
  'http:': (url) => createRequestHttp(url),
};

const scaffold = (url, structure) => {
  const api = {};
  const request = requests[url.protocol](url);
  const services = Object.keys(structure);
  if (!request) throw new Error(`Unknown protocol ${url.protocol}`);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      api[serviceName][methodName] = (...args) =>
        request(serviceName, methodName, args);
    }
  }
  return api;
};

globalThis.api = scaffold(url, structure);
