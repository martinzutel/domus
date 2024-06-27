import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@prisma/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session }) {
      if (session.user?.image) {
        // console.log("image is: " + session.user.image);
        session.user.image = session.user.image.replace("=s96-c", "=s400-c");
        // console.log("replaced with: " + session.user.image);
        if (session.user.email) {
          await prisma.user.update({
            where: { email: session.user.email },
            data: {
              image: session.user.image,
            },
          });
        }
      }
      return session;
    },
    async signIn({ user }) {
      if (user?.image) {
        // console.log("image is: " + user.image);
        user.image = user.image.replace("=s96-c", "=s480-c");
        //console.log("replaced with: " + user.image);
        if (user.email) {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              image: user.image,
            },
          });
          // console.log ("updated image:" + JSON.stringify(await prisma.user.findMany({
          //   where: {email: user.email}
          // })))
        }
      }
      return true;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };