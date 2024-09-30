import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email');

    try {
        const posts = await prisma.post.findMany({
            where: {
                email: email || ''
            },
            orderBy: {
                date: 'desc',
            },
            include: {
                comments: true,
                owner: true,
                reposts: {
                    include: {
                        post: {  // Include the full reposted post details
                            include: {
                                comments: true,  // Optionally include comments on the reposted post                                
                            },
                        },
                        user: true,  // Include the user who made the repost
                    },
                },
            },
        });

        console.log(posts, "this is get all posts info");
        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
