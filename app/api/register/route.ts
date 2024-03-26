import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "@/utils/database";
import User, { ISchema } from "@/models/user";

export async function POST (request: NextRequest) {
  const { email, username, password } = await request.json()

  try {
    await connectMongoDB()

    const id = `${+new Date()}` as unknown as ISchema
    const hashedPassword = await bcrypt.hash(password, 10) as unknown as ISchema 

    const newUser = new User({ id, email, username, password: hashedPassword })
    await newUser.save()

    return NextResponse.json({
      message: 'registration successfully',
      data: { id }
    }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}