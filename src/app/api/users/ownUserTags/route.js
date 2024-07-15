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
    //console.log(userData);

    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized: user data not found" }, { status: 401 });
    }

    const data = await request.json();

    const tags = data.tags;
    const userId = user.id;

    const ownTags = await prisma.ownTags.findUnique({
      where: { userId: userId },
    });

    if (!ownTags) {
      return NextResponse.json({ message: "User tags not found." }, { status: 404 });
    }

    const updatedTagStatuses = {};
    tags.forEach(tag => {
      if (ownTags.hasOwnProperty(tag)) {
        updatedTagStatuses[tag] = !ownTags[tag];
      }
    });

    const updatedTags = await prisma.ownTags.update({
      where: { userId: userId },
      data: updatedTagStatuses,
    });

    return NextResponse.json(updatedTags);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }
}