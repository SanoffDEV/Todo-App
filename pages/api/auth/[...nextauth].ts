import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/src/lib/prisma";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Vérifie les variables d’environnement
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error(
    "Les variables GITHUB_CLIENT_ID ou GITHUB_CLIENT_SECRET ne sont pas définies."
  );
}
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Les variables GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET ne sont pas définies."
  );
}

if (!process.env.NEXTAUTH_URL) {
  throw new Error("NEXTAUTH_URL n’est pas défini.");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET n’est pas défini.");
}

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      console.log("Redirect URL:", url);
      console.log("Base URL:", baseUrl);
      return url;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

export default NextAuth(authConfig);
