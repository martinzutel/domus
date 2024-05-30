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
    async signIn({ user }) {
      if (user?.image) {
        user.image = user.image.replace("=s96-c", "=s480-c");
      }
    
      if (user?.email) {
        const existingUser = await prisma.user.findUnique({ where: { email: user.email }});
    
        if (existingUser) {
          await prisma.user.update({
            where: { email: user.email },
            data: { image: user.image || undefined || null },
          });
        }
      }
    
      return true;
    },
  },
});

export { handler as GET, handler as POST };