import prisma from "@prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { searchTags } = body;

    if (!searchTags || !Array.isArray(searchTags)) {
      return NextResponse.json({ message: "Invalid searchTags format." }, { status: 400 });
    }

    // Get all users with their ownTags
    const users = await prisma.user.findMany({
      include: {
        ownTags: true,
      },
    });

    // Filter and sort users based on matching tags
    const filteredUsers = users
      .map(user => {
        // Count the number of matching tags
        const matchingTags = user.ownTags.filter(tag => searchTags.includes(tag.tagValue));
        return { user, matchCount: matchingTags.length };
      })
      // Filter out users with no matching tags
      .filter(({ matchCount }) => matchCount > 0)
      // Sort users by the number of matching tags in descending order
      .sort((a, b) => b.matchCount - a.matchCount)
      // Return only the user data
      .map(({ user }) => user);

    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.error("Error searching by tags:", error);
    return NextResponse.json(
      { message: "Failed to search users by tags." },
      { status: 500 }
    );
  }
}