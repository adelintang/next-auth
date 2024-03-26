import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';
import connectMongoDB from "@/utils/database";
import User, { ISchema } from "@/models/user";

export async function POST (request: Request) {
  const { email, username, password } = await request.json()

  try {
    await connectMongoDB()

    const hashedPassword = await bcrypt.hash(password, 10) as unknown as ISchema 

    const newUser = new User({ email, username, password: hashedPassword })
    await newUser.save()

    return NextResponse.json({
      message: 'registration successfully',
    }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}