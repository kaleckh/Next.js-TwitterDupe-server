import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {    
    const username = req.nextUrl.searchParams.get('username')?.toLowerCase();  
    console.log('im hit')  
    try {
        const user = await prisma.user.findMany({
            where: {
                username: { contains: username, mode: 'insensitive' }
            },
            include: {
                comments: { include: {
                    replies: true,
                    
                }},
                posts: true
            },
        });
        console.log(user, 'this is a user with comments');
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}