import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const userId = data.userId;
  const postId = data.postId;
  try {
    // Fetch the current likes array from the post
    const existingPost = await prisma.comment.findFirst({
      where: {
        id: postId ? postId : "",
      },
      select: {
        likes: true,
      },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    let currentLikes = existingPost.likes || [];
    if (currentLikes.includes(userId)) {
      currentLikes = currentLikes.filter((like) => like !== userId);
    } else {
      currentLikes.push(userId);
    }

    const updateLikes = await prisma.comment.update({
      where: {
        id: postId ? postId : "",
      },
      data: {
        likes: currentLikes, // Ensure this array is valid
      },
    });

    return NextResponse.json({ update: updateLikes });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while updating likes" },
      { status: 500 },
    );
  }
}
