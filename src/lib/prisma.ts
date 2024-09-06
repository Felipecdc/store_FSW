import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrima: PrismaClient;
}

let prisma: PrismaClient;
if (process.nextTick.NODE.ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrima) {
    global.cachedPrima = new PrismaClient();
  }
  prisma = global.cachedPrima;
}

export const prismaClient = prisma;
