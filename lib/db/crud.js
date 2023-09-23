const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const crud = (model) => ({
  async read(id) {
    if (!id) {
      return await prisma[model].findMany();
    }
    return prisma[model].findUnique({
      where: { id },
    });
  },

  async create(record) {
    return prisma[model].create({
      data: record,
    });
  },

  async update(id, record) {
    return prisma[model].update({
      where: { id },
      data: record,
    });
  },

  async delete(id) {
    return prisma[model].delete({
      where: { id },
    });
  },
});

module.exports = crud;
