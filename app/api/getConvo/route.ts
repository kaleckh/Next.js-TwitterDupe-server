import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  console.log(id, 'this is conversation id');
  try {
    // Fetch the messages related to the conversation
    const test = await prisma.message.findMany({
      where: { conversationId: id || '' },
      include: {
        user: true,
        conversation: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    // Fetch all users in the conversation
    const usersInConversation = await prisma.usersInConversations.findMany({
      where: { conversationId: id || '' },
      include: {
        user: true // Include user details for each participant
      }
    });

    // Combine the data to include usersInConversation in the response
    const response = {
      messages: test, // List of messages
      users: usersInConversation // List of users in the conversation
    };

    console.log(response, 'this is the combined response');
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
