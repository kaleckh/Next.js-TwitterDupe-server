import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("email")?.toLowerCase();
  console.log(id, "this is the email");
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: id ? id : undefined,
      },
      include: {
        comments: {
          orderBy: {
            date: 'desc'
          },
          include: {
            replies: true,
            user: true
          },
        },
        repostedcomments: {
          orderBy: {
            date: 'desc'
          },
          include: {
            comment: {
              include: {
                replies: true,
                user:true
              }
            }
          }
        },
        posts: true,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
