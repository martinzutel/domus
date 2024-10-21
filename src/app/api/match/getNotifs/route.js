import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET(request) {
  try {
    // Fetch the logged user's data
    const userRes = await fetch(`${baseUrl}/api/users/getUser`, {
      headers: {
        cookie: request.headers.get("cookie"),
      },
    });

    if (!userRes.ok) {
      return NextResponse.json(
        { message: "Unauthorized: user data not found" },
        { status: 401 }
      );
    }

    const userData = await userRes.json();
    const userId = userData.id;

    if (!userId) {
      return NextResponse.json({ message: "User ID is required." }, { status: 400 });
    }

    // Fetch pending match requests where the user is the receiver
    const pendingRequests = await prisma.matchRequest.findMany({
      where: {
        receiverId: userId,
        status: "pending",
      },
      include: {
        requester: true,  // Optionally include requester details
      },
    });

    // Fetch accepted and denied match requests where the user is the receiver
    const acceptedDeniedRequests = await prisma.matchRequest.findMany({
      where: {
        receiverId: userId,
        status: {
          in: ["accepted", "denied"],
        },
      },
      include: {
        requester: true,  // Optionally include requester details
      },
    });

    return NextResponse.json({
      pending: pendingRequests,
      acceptedDenied: acceptedDeniedRequests,
    });
  } catch (error) {
    console.error("Error fetching match requests:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}