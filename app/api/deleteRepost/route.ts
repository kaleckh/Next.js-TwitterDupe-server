import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("user");
  const postId = req.nextUrl.searchParams.get("post");
  if (!userId || !postId) throw new Error()
  try {
    const deleteRepost = await prisma.repost.delete({
      where: {
        userId_postId: {
          userId,
          postId
        }
      },
    });

    return NextResponse.json(deleteRepost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
