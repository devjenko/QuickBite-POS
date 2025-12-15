import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      staffId: string;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    staffId: string;
    firstName: string;
    lastName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    staffId: string;
    firstName: string;
    lastName: string;
  }
}
