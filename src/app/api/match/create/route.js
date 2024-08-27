import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

export async function POST(request) {
  try {
    const { requesterId, receiverId } = await request.json();

    if (!requesterId || !receiverId) {
      return NextResponse.json({ message: "Missing user IDs." }, { status: 400 });
    }

    if (requesterId === receiverId) {
      return NextResponse.json({ message: "Cannot request a match with yourself." }, { status: 400 });
    }

    const existingRequest = await prisma.matchRequest.findUnique({
      where: { requesterId_receiverId: { requesterId, receiverId } }
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
    return NextResponse.json({ message: "Failed to create match request." }, { status: 500 });
  }
}
