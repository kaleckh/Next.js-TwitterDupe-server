import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data, 'this is the data')
  try {
    const test = await prisma.post.create({
      data: {
        content: data.content,
        date: new Date(),
        email: data.email.toLowerCase(),
        userName: data.userName,
      },
    });
    return NextResponse.json({ hello: test });
  } catch (error) {
    console.log(error);
  }
}
