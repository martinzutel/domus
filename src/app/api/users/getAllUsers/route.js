import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

export async function GET(req) {
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
        contact: true,
        ownTags: {
          select: {
            tagName: true,
          },
        },
        likedTags: {
          select: {
            tagName: true,
          },
        },
      },
    });

    const formattedUsers = allUsers.map((user) => ({
      ...user,
      ownTags: user.ownTags.map((tag) => tag.tagName),
      likedTags: user.likedTags.map((tag) => tag.tagName),
    }));

    return NextResponse.json(formattedUsers);
    // return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
