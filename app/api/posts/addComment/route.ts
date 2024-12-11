import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data, 'this is the data')
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: data.comment,
        userName: data.userName,
        postId: data.parent_post_id,
        userId: data.userId,
        parentId: data.parent_id ? data.parent_id : null,
      },
    });

    const allComments = await prisma.comment.findMany({
      where: {
        postId: data.parent_id,
      },
      orderBy: {
        date: "asc", 
      },
    });

    return NextResponse.json({ comments: allComments });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
