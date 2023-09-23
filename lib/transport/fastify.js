const fastify = require('fastify')({
  logger: false,
});
const cors = require('@fastify/cors');
const { HEADERS } = require('./headers.js');

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
        const result = await handler(...request.body);
        reply.code(200).send(result);
      });
    }
  }
};

const start = async (port) => {
  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

module.exports = async (routing, port) => {
  await fastify.register(cors, HEADERS);
  await setup(routing);
  await start(port);
};
