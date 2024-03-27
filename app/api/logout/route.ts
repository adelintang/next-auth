import connectMongoDB from "@/utils/database";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = process.env.COOKIE_NAME || ''
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || ''

export async function DELETE (request: Request) {
  try {
    await connectMongoDB()
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIE_NAME)
    const tokenValue = token?.value as string

    // const decode: IDecodeJwt = jwt.verify(tokenValue, JWT_TOKEN_SECRET) as IDecodeJwt
    jwt.verify(tokenValue, JWT_TOKEN_SECRET)
    cookies().delete(COOKIE_NAME)
    
    return NextResponse.json({
      message: 'Logout Successfully'
    }, {
      status: 200,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: false, message: error.message }, { status: 400 })
    }
  }
}