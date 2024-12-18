import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

export async function GET(req: NextRequest) {
  try {
    const cookies = req.headers.get("cookie");

    if (!cookies) {
      console.error("No cookies found in the request.");
      return NextResponse.json(
        { message: "No cookies found in the request." },
        { status: 401 },
      );
    }

    // Parse cookies into an object
    const parsedCookies = Object.fromEntries(
      cookies.split("; ").map((cookie) => cookie.split("=")),
    );

    // Try to get the session token
    let sessionToken = parsedCookies["next-auth.session-token"];

    // Fallback to the secure session token if the regular token is not found
    if (!sessionToken) {
      sessionToken = parsedCookies["__Secure-next-auth.session-token"];
    }

    if (!sessionToken) {
      console.error("Session token not found in cookies.");
      return NextResponse.json(
        { message: "Session token not found in cookies." },
        { status: 401 },
      );
    }

    // Retrieve the session and user from Prisma
    const session = await prisma.session.findUnique({
      where: {
        sessionToken: sessionToken,
      },
      include: {
        user: true,
      },
    });

    if (session && session.user) {
      return NextResponse.json(session.user);
    } else {
      console.error("Session or User not found.");
      return NextResponse.json(
        { message: "Session or User not found." },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error in retrieving user from session token:", error);
    return NextResponse.json(
      { message: "Error in retrieving user from session token", error },
      { status: 500 },
    );
  }
}
