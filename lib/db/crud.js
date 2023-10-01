// @ts-nocheck
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const crud = (modelName) => {
  const model = prisma[modelName];
  if (!model) {
    throw new Error(`Model ${modelName} does not exist`);
  }

  return {
    async create(record) {
      return await model.create({
        data: record,
      });
    },

    async read(id) {
      if (!id) return await model.findMany();
      return await model.findUnique({
        where: { id },
      });
    },

    async update(id, record) {
      return await model.update({
        where: { id },
        data: record,
      });
    },

    async delete(id) {
      return await model.delete({
        where: { id },
      });
    },
  };
};

module.exports = crud;
