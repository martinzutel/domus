import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(req) {
    const token = await getToken({ req });

    if (token) {
        console.log(JSON.stringify(token));
        return NextResponse.json({ token });
    }
    console.log(token);
    return NextResponse.json("No token");
}