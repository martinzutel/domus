import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userIdQueryParam = url.searchParams.get("userId");

    let userId;

    // Determine userId based on query or logged-in user
    if (userIdQueryParam) {
      userId = userIdQueryParam;
    } else {
      // Fetch logged-in user's data
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
      userId = userData?.id;

      if (!userId) {
        return NextResponse.json(
          { message: "User ID is required." },
          { status: 400 }
        );
      }
    }

    // Fetch pending match requests where the user is the receiver
    const pendingRequests = await prisma.matchRequest.findMany({
      where: {
        receiverId: userId,
        status: "pending",
      },
      include: {
        requester: {
          include: {
            ownTags: true, // Include requester's ownTags
          },
        },
      },
    });

    // Fetch accepted and denied match requests where the user is involved
    const acceptedDeniedRequests = await prisma.matchRequest.findMany({
      where: {
        OR: [
          { receiverId: userId, status: { in: ["accepted", "denied"] } },
          { requesterId: userId, status: { in: ["accepted", "denied"] } },
        ],
      },
      include: {
        requester: {
          include: {
            ownTags: true, // Include requester's ownTags
          },
        },
        receiver: true, // Optionally include receiver details
      },
    });

    // Return match data
    return NextResponse.json({
      pending: pendingRequests,
      acceptedDenied: acceptedDeniedRequests,
    });
  } catch (error) {
    console.error("Error fetching match data:", error.message, error.stack);
    return NextResponse.json(
      { message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
}
