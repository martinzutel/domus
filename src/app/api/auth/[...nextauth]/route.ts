import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@prisma/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      if (session.user?.image) {
        // Modify the image URL to request a higher resolution image
        session.user.image = session.user.image.replace("=s96-c", "=s400-c");
      }
      return session;
    },
    async signIn({ profile }) {
      if (profile?.image) {
        // Modify the image URL to request a higher resolution image
        profile.image = profile.image.replace("=s96-c", "=s400-c");
      }
      return true;
    }
  }
});

export { handler as GET, handler as POST };