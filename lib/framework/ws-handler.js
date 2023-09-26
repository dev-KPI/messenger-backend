const handler = async ({ routing, socket, console, message }) => {
  const send = (result) => {
    socket.send(JSON.stringify(result), { binary: false });
  };
  const obj = JSON.parse(message);
  const { name, method, args = [] } = obj;
  const entity = routing[name];
  if (!entity) {
    send({ error: 'Entity not found' });
    return;
  }
  const handler = entity[method];
  if (!handler) {
    send({ error: 'Handler hot found' });
    return;
  }
  try {
    const result = await handler(...args);
    send(result);
  } catch (err) {
    console.error(err);
    send({ error: 'Server error' });
  }
};

// TODO: unify and create http-handler.js
module.exports = handler;
