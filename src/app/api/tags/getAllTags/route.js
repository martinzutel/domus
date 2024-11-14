import { NextResponse } from "next/server";
import prisma from "@prisma/prisma";

export async function GET(req) {
  try {

    const allTags = await prisma.tag.findMany({
      select: {
        tagName: true,
        tagValue: true 
      }
    })

    return NextResponse.json(allTags);
  
  } catch (error) {

    return NextResponse.json({ message: error.message }, { status: 500 })

  }
}

//  http://localhost:3000/api/tags/getAllTags
