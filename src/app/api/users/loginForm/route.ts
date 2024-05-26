import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const login = useSession();

    const body = await req.json(); // Attempt to parse JSON body
    if (!body || !body.email) {
      return NextResponse.json({ message: "Missing required fields (email)." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 400 });
    }

    // TODO: Add your logic here

    return NextResponse.json({ message: "User details retrieved." }); // Placeholder
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }
}
