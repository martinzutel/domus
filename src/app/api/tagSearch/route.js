import prisma from "@prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { searchTags } = body;

    if (!searchTags || !Array.isArray(searchTags)) {
      return NextResponse.json(
        { message: "Invalid searchTags format." },
        { status: 400 },
      );
    }

    const users = await prisma.user.findMany({
      include: {
        ownTags: true,
      },
    });

    const filteredUsers = users
      .map((user) => {
        const matchingTags = user.ownTags.filter((tag) =>
          searchTags.includes(tag.tagValue),
        );
        return { user, matchCount: matchingTags.length };
      })

      .filter(({ matchCount }) => matchCount > 0)

      .sort((a, b) => b.matchCount - a.matchCount)

      .map(({ user }) => user);

    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.error("Error searching by tags:", error);
    return NextResponse.json(
      { message: "Failed to search users by tags." },
      { status: 500 },
    );
  }
}
