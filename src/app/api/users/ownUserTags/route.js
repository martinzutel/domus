import { NextRequest, NextResponse } from "next/server.js";
import prisma from "@prisma/prisma";
import authOptions from "../../auth/[...nextauth]/route.ts";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET(request) { 
  try {
      const res = await fetch(`${baseUrl}/api/users/getUser`, {
          headers: {
              'cookie': request.headers.get('cookie')
          },
      });

      if (!res.ok) {
          return NextResponse.json({ message: "Unauthorized: user data not found" }, { status: 401 });
      }

      const userData = await res.json();
      // console.log(userData);

      const user = await prisma.user.findUnique({
          where: { email: userData.email },
      });

      if (!user) {
          return NextResponse.json({ message: "Unauthorized: user data not found" }, { status: 401 });
      }

      const tags = await prisma.user.findMany({
          where: { id: user.id },
          select: {
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
      })

      const formattedTags = tags.map((user) => ({
        ...user,
        ownTags: user.ownTags.map((tag) => tag.tagName),
        likedTags: user.likedTags.map((tag) => tag.tagName),
      }));

 /*      const ownTags = await prisma.tag.findMany({
          where: { userId: user.id },
      });

      const likedTags = await prisma.likedTags.findMany({
          where: { userId: user.id },
      });

      const tags = {
          ownTags,
          likedTags
      }; */

      return NextResponse.json(formattedTags);
  } catch (error) {
      console.error("Error parsing request body:", error);
      return NextResponse.json(
          { message: "Invalid request body.", error },
          { status: 400 }
      );
  }
}


export async function POST(request) {
  try {
    const res = await fetch(`${baseUrl}/api/users/getUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Unauthorized: user data not found" }, { status: 401 });
    }

    const userData = await res.json();

    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized: user data not found" }, { status: 401 });
    }

    const data = await request.json();
    const tags = data.tags;
    const userId = user.id;

    // Get the existing owned tags
    const existingTags = await prisma.user.findUnique({
      where: { id: userId },
      include: { ownTags: true },
    });

    const existingTagNames = existingTags.ownTags.map(tag => tag.tagName);

    // Determine which tags to add and which to remove
    const tagsToAdd = tags.filter(tag => !existingTagNames.includes(tag));
    const tagsToRemove = existingTagNames.filter(tag => tags.includes(tag));

    // Handle tags to add
    const tagsToAddRecords = await Promise.all(
      tagsToAdd.map(async (tagName) => {
        let tag = await prisma.tag.findUnique({
          where: { tagName },
        });

        if (!tag) {
          tag = await prisma.tag.create({
            data: { tagName },
          });
        }

        return tag;
      })
    );

    const tagIdsToAdd = tagsToAddRecords.map(tag => ({ tagId: tag.tagId }));

    // Handle tags to remove
    const tagsToRemoveRecords = await prisma.tag.findMany({
      where: { tagName: { in: tagsToRemove } },
    });

    const tagIdsToRemove = tagsToRemoveRecords.map(tag => ({ tagId: tag.tagId }));

    // Update user's owned tags
    await prisma.user.update({
      where: { id: userId },
      data: {
        ownTags: {
          connect: tagIdsToAdd,
          disconnect: tagIdsToRemove,
        },
      },
    });

    // Get the updated list of owned tags
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        ownTags: true,
      },
    });

    return NextResponse.json({
      message: "Tags updated successfully",
      "Added Tags": tagsToAdd,
      "Removed Tags": tagsToRemove,
    });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }
}