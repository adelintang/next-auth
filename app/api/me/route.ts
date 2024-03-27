import { NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from "@/models/user";
import connectMongoDB from "@/utils/database";
import { cookies } from "next/headers";

interface IDecodeJwt extends JwtPayload {
  userId: string
}

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || ''
const COOKIE_NAME = process.env.COOKIE_NAME || ''

export async function GET (request: Request) {
  try {
    await connectMongoDB()
    // const cookie = request.headers.get('cookie')
    // const cookieValue = cookie?.split('=')[1] as string
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIE_NAME)
    const tokenValue = token?.value as string

    const decode: IDecodeJwt = jwt.verify(tokenValue, JWT_TOKEN_SECRET) as IDecodeJwt

      const user = await User.findById(decode.userId)
      const userData = {
        email: user.email,
        username: user.username
      }
      return NextResponse.json({ status: true, message: 'Ok', data: { userInfo: userData } }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: false, message: error.message }, { status: 400 })
    }
  }
}