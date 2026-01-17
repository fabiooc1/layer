import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../prisma-pg/generated/client";

export const pgPrisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env!.PG_DB_URL,
  }),
});
