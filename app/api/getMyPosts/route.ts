import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email');
    const id = req.nextUrl.searchParams.get('id')
    if(!id) throw new Error()

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

        const reposts = await prisma.repost.findMany({
            where: {
                userId: id
            },
            orderBy: {
                date: 'desc'
            },
            include: {
                post: true
            }
        })
        console.log(reposts, 'repost info')
        return NextResponse.json({posts, reposts});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
