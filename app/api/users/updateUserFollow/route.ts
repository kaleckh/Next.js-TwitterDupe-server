import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { myId, theirId } = data;

    // Check that both IDs are provided
    if (!myId || !theirId) {
      return NextResponse.json({ error: "Missing user IDs" }, { status: 400 });
    }

    // Retrieve the current user and the target user from the database
    const [myUser, theirUser] = await Promise.all([
      prisma.user.findUnique({ where: { id: myId } }),
      prisma.user.findUnique({ where: { id: theirId } }),
    ]);

    // If either user does not exist, return an error
    if (!myUser || !theirUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update following list for the current user
    let updatedMyFollowing = myUser.following || [];
    if (updatedMyFollowing.includes(theirId)) {
      updatedMyFollowing = updatedMyFollowing.filter((id) => id !== theirId); // Remove their ID if it exists
    } else {
      updatedMyFollowing.push(theirId); // Add their ID if it doesn't exist
    }

    // Update followers list for the target user
    let updatedTheirFollowers = theirUser.followers || [];
    if (updatedTheirFollowers.includes(myId)) {
      updatedTheirFollowers = updatedTheirFollowers.filter((id) => id !== myId); // Remove my ID if it exists
    } else {
      updatedTheirFollowers.push(myId); // Add my ID if it doesn't exist
    }

    // Update both users in the database
    const updateMyFollowing = prisma.user.update({
      where: { id: myId },
      data: { following: updatedMyFollowing },
    });
    

    const updateTheirFollowers = prisma.user.update({
      where: { id: theirId },
      data: { followers: updatedTheirFollowers },
    });

    // Execute both updates in parallel
    await Promise.all([updateMyFollowing, updateTheirFollowers]);

    return NextResponse.json({
      message: "Followers and following updated successfully",
    });
  } catch (error) {
    console.error("Error updating user followers and following:", error);
    return NextResponse.json(
      { error: "Failed to update followers and following" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
