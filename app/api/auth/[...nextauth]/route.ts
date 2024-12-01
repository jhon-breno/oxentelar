import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { db } from "@/app/_lib/prisma"

// Define your authOptions with the correct type
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id } as {
        id: string
        name: string
        email: string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Handler for Next.js API route
const handler = NextAuth(authOptions)

// Export for both GET and POST requests
export { handler as GET, handler as POST }
