import authOptions from "../auth/[...nextauth]/route.ts";
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession(req, res, authOptions)

  if (!session) {
    res.json({ message: "You must be logged in." })
    return
  }
  console.log(session)
  return res.json({
    message: "Success",
  })
}

export async function GET(req, res){ 
  const session = await getSession(req, res, authOptions)

  if (!session) {
    res.json({ message: "You must be logged in." })
    return
  }
  console.log(session)
  return res.json({
    message: "Success",
  })
}