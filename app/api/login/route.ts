import bcrypt from 'bcrypt'
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken'
import User, { IUser } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/utils/database';

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || ''
const COOKIE_NAME = process.env.COOKIE_NAME || ''
const MAX_AGE = 60 * 60 * 24 * 30

interface IRegUser extends IUser {
  _id: string
}

export async function POST (request: NextRequest) {
  const { email, password } = await request.json()

  try {
    await connectMongoDB()
    const verifyUser: IRegUser | null = await User.findOne({ email })

    if (!verifyUser || verifyUser === null) {
      throw new Error('email or password is wrong')
    }

    const verifyPassword = await bcrypt.compare(password, verifyUser.password as unknown as string)
    
    if (!verifyPassword) {
      throw new Error('email or password is wrong')
    }

    const userToken = {
      userId: verifyUser._id
    }

    const token = jwt.sign(userToken, JWT_TOKEN_SECRET, { expiresIn: MAX_AGE })

    const seralized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });
  

    return NextResponse.json({ message: 'Authentication Successfully' }, {
      status: 200,
      headers: { "Set-Cookie": seralized },
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}