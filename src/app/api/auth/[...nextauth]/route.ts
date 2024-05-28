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
    async session({ session }) {
      if (session.user?.image) {
        console.log("image is: " + session.user.image);
        // Modify the image URL to request a higher resolution image
        session.user.image = session.user.image.replace("=s96-c", "=s400-c");
        console.log("replaced with: " + session.user.image);
        prisma.user.update({
          where: { email: session.user.email },
          data: {
            image: session.user.image.replace("=s96-c", "=s400-c")
          }
        })
      }
      return session;
    },
    async signIn({ user }) {
      if (user?.image) {
        console.log("image is: " + user.image);
        // Modify the image URL to request a higher resolution image
        user.image = user.image.replace("=s96-c", "=s400-c");
        console.log("replaced with: " + user.image);
        prisma.user.update({
          where: { email: user.email },
          data: {
            image: user.image.replace("=s96-c", "=s400-c")
          }
        })
      }
      return true;
    }
  }
});

export { handler as GET, handler as POST };