import { NextResponse } from "next/server.js";
import prisma from "@prisma/prisma";
import { getSession } from "next-auth/react";

//CAMBIAR ESTO A FALSE CUANDO HAGAS EL FETCHEO
const ENABLE_SESSION_SIMULATION = false;

export async function POST(request) {
  try {
    let session;

    if (ENABLE_SESSION_SIMULATION) {
      session = {
        user: {
          email: 'pong',
          name: 'pong',
          id: '1',
        },
      };
    } else {
      // const session = await getSession({ req: request });
      // console.log(session)
      // if (!session) {
      //   return NextResponse.json({ message: "Unauthorized: No session" }, { status: 401 });
      // }
    }

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
      { message: "Invalid request body." },
      { status: 400 }
    );
  }
}
