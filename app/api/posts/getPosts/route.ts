import { PrismaClient, Repost, Post } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("id");
  if (!userId) {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          date: "desc",
        },
        include: {
          comments: true,
          owner: true,
          reposts: true,
        },
      });

      const reposts = await prisma.repost.findMany({
        orderBy: {
          date: "desc",
        },
        include: {
          user: true,
          post: {
            include: {
              comments: true,
              owner: true,
              reposts: true,
            },
          },
        },
      });
      //@ts-ignore
      const query = [...posts, ...reposts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      return NextResponse.json({ Posts: query });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to fetch posts" },
        { status: 500 },
      );
    }
  } else {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("user no exist");

    try {
      const posts = await prisma.post.findMany({
        where: {
          owner: {
            id: { in: [...user.following, userId] },
          },
        },
        orderBy: {
          date: "desc",
        },
        include: {
          comments: true,
          owner: true,
          reposts: true,
        },
      });

      const reposts = await prisma.repost.findMany({
        where: {
          userId: {
            in: [...user.following, userId],
          },
        },
        orderBy: {
          date: "desc",
        },
        include: {
          user: true,
          post: {
            include: {
              comments: true,
              owner: true,
              reposts: true,
            },
          },
        },
      });
      //@ts-ignore
      const query = [...posts, ...reposts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      return NextResponse.json({ Posts: query });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to fetch posts" },
        { status: 500 },
      );
    }
  }
}
