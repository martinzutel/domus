import { NextRequest, NextResponse } from "next/server.js";
import prisma from "@prisma/prisma";
import authOptions from "../../auth/[...nextauth]/route.ts";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET(request) { 
  try {
      // Fetch user data from the /api/users/getUser endpoint
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

      const ownTags = await prisma.ownTags.findMany({
          where: { userId: user.id },
      });

      const likedTags = await prisma.likedTags.findMany({
          where: { userId: user.id },
      });

      const tags = {
          ownTags,
          likedTags
      };

      return NextResponse.json(tags);
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
    // Fetch user data using the provided cookie
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
    console.log(userData);

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized: user data not found" }, { status: 401 });
    }

    // Get the request data
    const data = await request.json();

    // Extract the tag and its current status
    const tagName = data.tag;
    const userId = user.id;

    // Find the current tag status in the ownTags table
    const ownTags = await prisma.ownTags.findUnique({
      where: { userId: userId },
    });

    if (!ownTags) {
      return NextResponse.json({ message: "User tags not found." }, { status: 404 });
    }

    // Toggle the tag status
    const newTagStatus = !ownTags[tagName];

    // Update the tag status
    const updatedTags = await prisma.ownTags.update({
      where: { userId: userId },
      data: { [tagName]: newTagStatus },
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