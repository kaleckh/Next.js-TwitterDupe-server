import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const userId = data.userId;
  const postId = data.postId;
  console.log(postId, "this is the data");
  try {
    const existingPost = await prisma.post.findUnique({
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

    // Ensure likes is always an array
    let currentLikes = existingPost.likes || []; // If likes is null, initialize as an empty array

    // Check if the userId exists in the likes array
    if (currentLikes.includes(userId)) {
      // Remove the userId if it exists
      currentLikes = currentLikes.filter((like) => like !== userId);
    } else {
      // Add the userId if it doesn't exist
      currentLikes.push(userId);
    }

    // Update the likes array in the database
    const updateLikes = await prisma.post.update({
      where: {
        id: postId ? postId : "",
      },
      data: {
        likes: currentLikes, // Ensure this array is valid
      },
    });

    // Return the updated post with likes
    return NextResponse.json({ update: updateLikes });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while updating likes" },
      { status: 500 },
    );
  }
}
