import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET(request) {
  try {
    // Log incoming request details for debugging
    console.log("Incoming request headers:", request.headers);

    // Fetch the logged user's data
    let userData;
    try {
      const userRes = await fetch(`${baseUrl}/api/users/getUser`, {
        headers: {
          cookie: request.headers.get("cookie"),
        },
      });

      if (!userRes.ok) {
        // Log failure and response content for debugging
        console.error(
          "Failed to fetch user data:",
          userRes.status,
          await userRes.text()
        );
        return NextResponse.json(
          { message: "Unauthorized: user data not found" },
          { status: 401 }
        );
      }

      userData = await userRes.json();
      console.log("Fetched user data:", userData);
    } catch (fetchError) {
      // Catch and log fetch-specific errors
      console.error("Error during fetch for user data:", fetchError.message, fetchError.stack);
      return NextResponse.json(
        { message: "Error retrieving user data", error: fetchError.message },
        { status: 500 }
      );
    }

    const userId = userData?.id;

    if (!userId) {
      console.error("User ID is missing in the fetched data.");
      return NextResponse.json({ message: "User ID is required." }, { status: 400 });
    }

    // Fetch pending match requests where the user is the receiver
    let pendingRequests;
    try {
      pendingRequests = await prisma.matchRequest.findMany({
        where: {
          receiverId: userId,
          status: "pending",
        },
        include: {
          requester: true, // Optionally include requester details
        },
      });
      console.log("Pending requests:", pendingRequests);
    } catch (prismaError) {
      // Catch and log Prisma-related errors
      console.error("Error fetching pending match requests:", prismaError.message, prismaError.stack);
      return NextResponse.json(
        { message: "Error fetching pending match requests", error: prismaError.message },
        { status: 500 }
      );
    }

    // Fetch accepted and denied match requests where the user is the receiver
    let acceptedDeniedRequests;
    try {
      acceptedDeniedRequests = await prisma.matchRequest.findMany({
        where: {
          receiverId: userId,
          status: {
            in: ["accepted", "denied"],
          },
        },
        include: {
          requester: true, // Optionally include requester details
        },
      });
      console.log("Accepted/Denied requests:", acceptedDeniedRequests);
    } catch (prismaError) {
      // Catch and log Prisma-related errors
      console.error("Error fetching accepted/denied match requests:", prismaError.message, prismaError.stack);
      return NextResponse.json(
        { message: "Error fetching accepted/denied match requests", error: prismaError.message },
        { status: 500 }
      );
    }

    // Return the match requests data
    return NextResponse.json({
      pending: pendingRequests,
      acceptedDenied: acceptedDeniedRequests,
    });
  } catch (error) {
    // Catch any unexpected errors and log them
    console.error("Unexpected error in GET request:", error.message, error.stack);
    return NextResponse.json(
      { message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
}
