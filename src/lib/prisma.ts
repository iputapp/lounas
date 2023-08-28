/**
 * Boilerplate code: Create a singleton instance of Prisma Client
 */
import { PrismaClient } from "@prisma/client";

const primsaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof primsaClientSingleton>;

const globalForPrisma = global as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? primsaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
