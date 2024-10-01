import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) { 
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                date: 'desc',
            },
            include: {
                comments: true,
                owner: true,
                reposts: true
            },
        });
        console.log(posts, 'this is post info');
        return NextResponse.json({ Posts: posts });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
