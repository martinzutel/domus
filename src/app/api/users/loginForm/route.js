import { NextResponse } from "next/server.js";
import prisma from "@prisma/prisma";

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, age, gender, about, contact, interests } = data.user;

    if (!email || !about || !age || !gender || !Array.isArray(interests)) {
      return NextResponse.json(
        { message: "Missing or invalid fields" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized: user data not found" },
        { status: 401 },
      );
    }

    const existingTags = await prisma.tag.findMany({
      where: { tagValue: { in: interests } },
    });

    const tagIds = existingTags.map((tag) => ({ tagId: tag.tagId }));

    await prisma.user.update({
      where: { email },
      data: {
        about,
        age,
        gender,
        contact,
        isRegisterComplete: true,
        ownTags: {
          set: tagIds,
        },
      },
    });

    return NextResponse.json(
      { message: "User data and interests updated." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }
}
