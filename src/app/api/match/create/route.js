import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(request) {
  try {
    
    const res = await fetch(`${baseUrl}/api/users/getUser`, {
      headers: {
        cookie: request.headers.get("cookie"),
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Unauthorized: user data not found" },
        { status: 401 },
      );
    }

    const userData = await res.json();
    const loggedInUserId = userData.id;

    const { requesterId, receiverId } = await request.json();

    // Validate that the requester is the logged-in user
    if (loggedInUserId !== requesterId) {
      return NextResponse.json(
        { message: "Unauthorized: requester does not match logged-in user." },
        { status: 403 },
      );
    }

    if (!requesterId || !receiverId) {
      return NextResponse.json({ message: "Missing user IDs." }, { status: 400 });
    }

    if (requesterId === receiverId) {
      return NextResponse.json({ message: "Cannot request a match with yourself." }, { status: 400 });
    }

    const existingRequest = await prisma.matchRequest.findUnique({
      where: { requesterId_receiverId: { requesterId, receiverId } },
    });

    if (existingRequest) {
      return NextResponse.json({ message: "Match request already exists." }, { status: 409 });
    }

    const matchRequest = await prisma.matchRequest.create({
      data: {
        requesterId,
        receiverId,
      },
    });

    return NextResponse.json(matchRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating match request:", error);
    return NextResponse.json(
      { message: "Failed to create match request." },
      { status: 500 }
    );
  }
}
