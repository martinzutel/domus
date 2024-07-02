import { NextRequest, NextResponse } from "next/server.js";
import prisma from "@prisma/prisma";
import authOptions from "../../auth/[...nextauth]/route.ts";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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

    const likedTags = await prisma.likedTags.findUnique({
      where: { userId: userId },
    });

    if (!likedTags) {
      return NextResponse.json({ message: "User tags not found." }, { status: 404 });
    }

    const updatedTagStatuses = {};
    tags.forEach(tag => {
      if (likedTags.hasOwnProperty(tag)) {
        updatedTagStatuses[tag] = !likedTags[tag];
      }
    });

    const updatedTags = await prisma.likedTags.update({
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