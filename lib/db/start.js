'use strict';

/**
 * @typedef { import("@prisma/client").User} User
 */
const { PrismaClient } = require('@prisma/client');

const start = async (config) => {
  const prisma = new PrismaClient({ datasourceUrl: config.url });
  await prisma.$connect();
  return prisma;
};

module.exports = start;
