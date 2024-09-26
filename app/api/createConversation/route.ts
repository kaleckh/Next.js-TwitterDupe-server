import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data, "this is data");

  try {
    const newConversation = await prisma.conversation.create({
      data: {
        date: new Date(),
        users: {
          create: [
            {
              user: {
                connect: {
                  id: data.myId,
                },
              },
            },
            {
              user: {
                connect: {
                  id: data.recipientId,
                },
              },
            },
          ],
        },
      },
    });
    await prisma.message.create({
      data: {
        conversationId: newConversation.id,
        message: data.message,
        status: "Delivered",
        userId: data.myId,
        date: new Date(),
      },
    });

    return NextResponse.json({ update: newConversation });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
