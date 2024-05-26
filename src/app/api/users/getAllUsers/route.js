import { NextResponse } from "next/server";
import prisma from "../../prisma/route.js";

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
  } catch (error) {
    return NextResponse.json({message: error.message }, { status: 500 });
  }
}