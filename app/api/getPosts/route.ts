import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {        
        const posts = await prisma.post.findMany({
            orderBy: {
                date: 'desc',
            },
            include: {
                comments: true, // Assumes your comments model is related to posts
            },
        });
        console.log(posts, 'this is post info');
        return NextResponse.json({ Posts: posts });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
