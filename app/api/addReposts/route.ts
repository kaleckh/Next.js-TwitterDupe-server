import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log(data, 'this is the important data');

        const updateLikes = await prisma.repost.create({
            data: {
                postId: data.postId,
                userId: data.userId,
                date: new Date(),
            },
        });

        return NextResponse.json({ update: updateLikes });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
