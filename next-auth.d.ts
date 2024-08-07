import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: Date | null;
      image: string;
      createdAt: string;
      updatedAt: string;
      about: string;
      age: number;
      gender: string;
      contact: string;
      isRegisterComplete: boolean;
    };
    expires: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string;
    createdAt: string;
    updatedAt: string;
    about: string;
    age: number;
    gender: string;
    contact: string;
    isRegisterComplete: boolean;
  }
}
