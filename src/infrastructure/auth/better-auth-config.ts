import { betterAuth } from "better-auth";
import { pgPrisma } from "../database/pg-prisma";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [nextCookies()],
  database: prismaAdapter(pgPrisma, {
    provider: "postgresql",
  }),
});
