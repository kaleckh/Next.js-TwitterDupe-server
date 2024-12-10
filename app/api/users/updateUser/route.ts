import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const updatedData: {
      bio?: string;
      location?: string;
      links?: string;
      color?: string;
    } = {};

    if (data.bio) {
      updatedData.bio = data.bio;
    }

    if (data.location) {
      updatedData.location = data.location;
    }

    if (data.links) {
      updatedData.links = data.links;
    }
    if (data.color) {
      updatedData.color = data.color;
    }

    // Update the user only with provided fields
    const updateUser = await prisma.user.update({
      where: {
        email: data.email.toLowerCase() || "",
      },
      data: updatedData,
    });

    return NextResponse.json({ update: updateUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}
