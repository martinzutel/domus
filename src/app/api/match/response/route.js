import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

export async function POST(request) {
  try {
    const { matchRequestId, action } = await request.json(); 

    if (!matchRequestId || (action !== "accept" && action !== "deny")) {
      return NextResponse.json({ message: "Invalid request data." }, { status: 400 });
    }

    const matchRequest = await prisma.matchRequest.findUnique({
      where: { id: matchRequestId },
    });

    if (!matchRequest) {
      return NextResponse.json({ message: "Match request not found." }, { status: 404 });
    }

    if (matchRequest.status !== "pending") {
      return NextResponse.json({ message: `Match request has already been ${matchRequest.status}.` }, { status: 400 });
    }

    const updatedMatchRequest = await prisma.matchRequest.update({
      where: { id: matchRequestId },
      data: {
        status: action === "accept" ? "accepted" : "denied",
      },
    });

    return NextResponse.json({
      message: `Match request ${action === "accept" ? "accepted" : "denied"} successfully.`,
      matchRequest: updatedMatchRequest,
    });
  } catch (error) {
    console.error("Error updating match request:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
