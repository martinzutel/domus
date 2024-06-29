import { NextResponse } from "next/server.js";
import prisma from "@prisma/prisma";
import { getSession } from "next-auth/react";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // console.log(data)
    if (!data.user.email || !data.user.about || !data.user.age || !data.user.gender) {
      return NextResponse.json({ message: "Missing required fields"}, { status: 400 });
      }

    const user = await prisma.user.findUnique({
      where: { email: data.user.email },
    });
    // console.log(user)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized: user data not found" }, { status: 401 });
    }

    await prisma.user.update({
      where: { email: data.user.email },
      data: {
        about: data.user.about,
        age: data.user.age,
        gender: data.user.gender,
        contact: data.user.contact,
        isRegisterComplete: true,
      },
    });

    return NextResponse.json({ message: "User data added." }, { status: 200 });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { message: "Invalid request body.", body },
      { status: 400 }
    );
  }
}
