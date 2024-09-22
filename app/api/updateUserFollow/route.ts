import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // Destructure the incoming data
        const { myId, theirId, theirFollowers, myFollowing } = data;

        // Check that both IDs are provided
        if (!myId || !theirId) {
            return NextResponse.json({ error: 'Missing user IDs' }, { status: 400 });
        }

        // Update the "following" list of the current user
        const updateMyFollowing = prisma.user.update({
            where: {
                id: myId,
            },
            data: {
                following: myFollowing || [], // Update with provided following list
            },
        });

        // Update the "followers" list of the other user
        const updateTheirFollowers = prisma.user.update({
            where: {
                id: theirId,
            },
            data: {
                followers: theirFollowers || [], // Update with provided followers list
            },
        });

        // Execute both updates in parallel
        await Promise.all([updateMyFollowing, updateTheirFollowers]);

        return NextResponse.json({ message: 'Followers and following updated successfully' });
    } catch (error) {
        console.error('Error updating user followers and following:', error);
        return NextResponse.json({ error: 'Failed to update followers and following' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
