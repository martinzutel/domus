import { NextRequest, NextResponse } from "next/server.js";
import prisma from "@prisma/prisma";
import { getSession } from "next-auth/react";
import authOptions from "../../auth/[...nextauth]/route.ts";

export async function GET(request: NextRequest) { 
    try {
        const userData = await getSession({ req: request});
        console.log(userData);
        const data = await request.json();
        //console.log(data);
        const user = await prisma.user.findUnique({
            where: { email: data.user.email },
        });
        if (!user) {
        return NextResponse.json({ message: "Unauthorized: user data not found" }, { status: 401 });
        }
        const ownTags = await prisma.ownTags.findMany({
            where: { email: user.email },
        });

        const likedTags = await prisma.likedTags.findMany({
            where: { email: user.email },
        });

        const tags = {
            ownTags,
            likedTags
        };
        return NextResponse.json(tags);
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json(
        { message: "Invalid request body." },
        { status: 400 }
        );
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const user = await prisma.user.findUnique({
        where: { email: data.user.email },
        });
        if (!user) {
        return NextResponse.json({ message: "Unauthorized: user data not found" }, { status: 401 });
        }
        const tags = await prisma.userTag.create({
        data: {
            userId: user.id,
            tag: data.tag,
        },
        });
        return NextResponse.json(tags);
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json(
        { message: "Invalid request body." },
        { status: 400 }
        );
    }
}