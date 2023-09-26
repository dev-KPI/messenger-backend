module.exports = async (fastify, port, console) => {
  try {
    await fastify.listen({ port });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
