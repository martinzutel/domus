import prisma from "@prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { searchTags } = body;

    if (!searchTags || !Array.isArray(searchTags)) {
      return NextResponse.json({ message: "Invalid searchTags format." }, { status: 400 });
    }

    const filteredUsers = await prisma.user.findMany({
      where: {
        ownTags: {
          is: {
            OR: searchTags.map((tag) => ({ name: tag })),
          },
        },
      },
      include: {
        ownTags: true,
      },
    });

    return NextResponse.json(filteredUsers);

  } catch (error) {
    console.error("Error searching by tags:", error);
    return NextResponse.json(
      { message: "Failed to search users by tags." },
      { status: 500 }
    );
  }
}
