import Prisma from '@prisma/client';

type ModelName = 'user' | 'message' | 'chat';

type PrismaModels = {
  user: Prisma.User;
  message: Prisma.Message;
  chat: Prisma.Chat;
};

interface Crud {
  <T extends ModelName>(
    modelName: T
  ): {
    read(id?: number): Promise<PrismaModels[T][]>;
    create(record: PrismaModels[T]): Promise<PrismaModels[T]>;
    update(id: number, record: Partial<PrismaModels[T]>): PrismaModels[T];
    delete(id: number): PrismaModels[T];
  };
}

declare global {
  const db: Prisma.PrismaClient;
  const crud: Crud;
}
