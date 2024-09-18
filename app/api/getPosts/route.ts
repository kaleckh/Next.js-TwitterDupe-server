import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    console.log('hitting get for you posts')
    try {        
        const posts = await prisma.post.findMany({
            orderBy: {
                date: 'desc',
            },
            include: {
                comments: true, 
            },
        });
        console.log(posts, 'this is post info');
        return NextResponse.json({ Posts: posts });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
