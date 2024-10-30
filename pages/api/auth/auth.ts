import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../../../prisma/prisma"
import NextAuth from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
})