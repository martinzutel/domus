import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

export async function POST(request) {
  try {
    const data = await request.json();
    const { matchRequestId, action } = data;

    // Ensure that action is either 'accept' or 'deny'
    if (!["accept", "deny"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // Update the match request status
    const updatedMatchRequest = await prisma.matchRequest.update({
      where: { id: matchRequestId },
      data: { status: action === "accept" ? "accepted" : "denied" },
    });

    return NextResponse.json({
      message: `Match request ${action}ed successfully`,
      matchRequest: updatedMatchRequest,
    });
  } catch (error) {
    console.error("Error updating match request:", error);
    return NextResponse.json({ message: "Failed to update match request" }, { status: 500 });
  }
}
