import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function GET() {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        age: true,
        gender: true,
        about: true,
      },
    });
    return NextResponse.json(allUsers);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function POST() {
  return Response.json({
    hello: "world",
  });
}
