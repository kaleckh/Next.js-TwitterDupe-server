import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("id");

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId ? postId : undefined,
      },
      include: {
        comments: {
          where: {
            parentId: null, // Only include comments with no parent
          },
          include: {
            user: true,            
            replies: true,
            repostedcomments: true,
          },
        },
        owner: true,
        reposts: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
