import { compare } from "bcrypt-ts";
import NextAuth, { type DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { DUMMY_PASSWORD } from "@/lib/constants";
import { createGuestUser, getUser } from "@/lib/db/queries";
import { authConfig } from "./auth.config";

export type UserType = "guest" | "regular";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      type: UserType;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    type: UserType;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.type = user.type;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.type = token.type as UserType;
      }
      return session;
    },
  },
  // In demo mode, use simplified guest provider without database calls
  ...(process.env.IS_DEMO === "1" ? {
    providers: [
      Credentials({
        id: "demo-guest",
        async authorize() {
          return {
            id: "demo-user",
            email: "demo@customer-service.local",
            name: "Demo Customer",
            type: "guest" as UserType,
          };
        },
        credentials: {},
      }),
    ],
    pages: {
      signIn: undefined, // No sign-in page in demo mode
    },
  } : {
    providers: [
      Credentials({
        async authorize(credentials) {
          const email = String(credentials.email ?? "");
          const password = String(credentials.password ?? "");
          const users = await getUser(email);

          if (users.length === 0) {
            await compare(password, DUMMY_PASSWORD);
            return null;
          }

          const [user] = users;

          if (!user.password) {
            await compare(password, DUMMY_PASSWORD);
            return null;
          }

          const passwordsMatch = await compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return { ...user, type: "regular" as UserType };
        },
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
      }),
      Credentials({
        async authorize() {
          const [guestUser] = await createGuestUser();
          return { ...guestUser, type: "guest" as UserType };
        },
        credentials: {},
        id: "guest",
      }),
    ],
  }),
});
