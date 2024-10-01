import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data, "this is data");

  try {
    // Check if a conversation between the two users already exists
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        users: {
          every: {
            OR: [
              { userId: data.myId },
              { userId: data.recipientId }
            ],
          },
        },
      },
    });

    // If conversation exists, return its id
    if (existingConversation) {
      return NextResponse.json({ conversationId: existingConversation.id });
    }

    // If no conversation exists, create a new one
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

    // Create the first message in the new conversation
    await prisma.message.create({
      data: {
        conversationId: newConversation.id,
        message: data.message,
        status: "Delivered",
        userId: data.myId,
        date: new Date(),
      },
    });

    // Return the new conversation id
    return NextResponse.json({ conversationId: newConversation.id });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
