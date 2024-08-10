import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ message: "Invalid user ID." }, { status: 400 });
    }

    const userProfile = await prisma.user.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!userProfile) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
