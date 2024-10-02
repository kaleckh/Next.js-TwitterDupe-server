import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const commentId = req.nextUrl.searchParams.get("id");

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId ? commentId : undefined,
      },
      include: {
        replies: true,
        user: true,
        parent: true,
      },
    });
    if (!comment) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    console.log(comment);
    return NextResponse.json({ comment });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
