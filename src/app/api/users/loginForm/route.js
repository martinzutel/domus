import { NextResponse } from "next/server.js";
import prisma from "@prisma/prisma";
// import { useSession } from "next-auth/react";

export async function POST(request) {
  try {
    const data = await request.json();
    
    if (!data.email || !data.about || !data.age || !data.gender) {
      return NextResponse.json({ message: "Missing required fields"}, { status: 400 });
      }

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found."}, {status: 400});
    }

    await prisma.user.update({
      where: { email: data.email },
      data: {
        about: data.about,
        age: data.age,
        gender: data.gender,
        contact: data.contact,
      },
    });

    return NextResponse.json({ message: "User data added." }, { status: 200 });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ message: "Invalid request body." }, { status: 400});
  }
}
