import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

export async function POST(request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/users/getUser`, {
      headers: {
        cookie: request.headers.get("cookie"),
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Unauthorized: user data not found" },
        { status: 401 }
      );
    }

    const userData = await res.json();
    const loggedInUserId = userData.id;

    const { matchRequestId, action } = await request.json();

    if (!matchRequestId || !action) {
      return NextResponse.json({ message: "Missing request data." }, { status: 400 });
    }

    const matchRequest = await prisma.matchRequest.findUnique({
      where: { id: matchRequestId },
    });

    if (!matchRequest) {
      return NextResponse.json({ message: "Match request not found." }, { status: 404 });
    }

    if (matchRequest.receiverId !== loggedInUserId) {
      return NextResponse.json({ message: "Unauthorized: You are not the receiver." }, { status: 403 });
    }

    if (matchRequest.status !== "pending") {
      return NextResponse.json({ message: "Request already responded to." }, { status: 400 });
    }

    const updatedRequest = await prisma.matchRequest.update({
      where: { id: matchRequestId },
      data: { status: action === "accept" ? "accepted" : "denied" },
    });

    return NextResponse.json({ message: `Match request ${action}ed successfully.` });
  } catch (error) {
    console.error("Error responding to match request:", error);
    return NextResponse.json({ message: "Failed to respond to match request." }, { status: 500 });
  }
}
