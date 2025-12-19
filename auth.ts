import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    businessId?: string;
  }
  interface Session {
    user: User & {
      id?: string;
      businessId?: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        businessId: { label: "Business ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        // Validate that credentials exist
        if (!credentials?.businessId || !credentials?.password) {
          return null;
        }

        // Find user in database by businessId
        const user = await prisma.user.findUnique({
          where: {
            businessId: credentials.businessId as string,
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

        // If everything is valid, remove the password and return the full user object
        delete (user as any).password;
        return user as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, add their data to the token
      if (user) {
        token.id = user.id;
        token.businessId = user.businessId;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data from token to the session object
      if (token) {
        session.user.id = token.id as string;
        session.user.businessId = token.businessId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
