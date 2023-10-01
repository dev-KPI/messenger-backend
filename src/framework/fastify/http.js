const fastify = require('fastify')({
  logger: false,
});
const cors = require('@fastify/cors');
const start = require('./start.js');

const setup = async (routing) => {
  const services = Object.keys(routing);
  for (const serviceName of services) {
    const service = routing[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      const path = `/${serviceName}/${methodName}`;
      fastify.post(path, async (request, reply) => {
        const entity = routing[serviceName];
        if (!entity) return reply.code(404).send('Not found');
        const handler = entity[methodName];
        if (!handler) return reply.code(404).send('Not found');
        if (!Array.isArray(request.body))
          return reply.code(400).send('Bad request');
        const result = await handler(...request.body);
        reply.code(200).send(result);
      });
    }
  }
};

module.exports = async (routing, port) => {
  await fastify.register(cors);
  await setup(routing);
  await start(fastify, port, console);
  console.log('Fastify HTTP 🔌');
};
