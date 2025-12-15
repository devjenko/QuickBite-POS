import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        staffId: { label: "Staff ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate that credentials exist
        if (!credentials?.staffId || !credentials?.password) {
          return null;
        }

        // Find user in database by staffId
        const user = await prisma.user.findUnique({
          where: {
            staffId: credentials.staffId as string,
          },
        });

        // If user doesn't exist, return null
        if (!user) {
          return null;
        }

        // Compare the provided password with the hashed password in database
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        // If password is invalid, return null
        if (!isPasswordValid) {
          return null;
        }

        // If everything is valid, return the user object
        return {
          id: user.id,
          staffId: user.staffId,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, add their data to the token
      if (user) {
        token.id = user.id;
        token.staffId = user.staffId;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data from token to the session object
      if (token) {
        session.user.id = token.id as string;
        session.user.staffId = token.staffId as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
