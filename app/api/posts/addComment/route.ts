import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: data.comment,
        userName: data.userName,
        postId: data.postId,
        userId: data.userId,
        parentId: data.commentId ? data.commentId : null,
      },
    });

    const allComments = await prisma.comment.findMany({
      where: {
        postId: data.postId,
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
