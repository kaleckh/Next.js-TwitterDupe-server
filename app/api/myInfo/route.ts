import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {    
    const id = req.nextUrl.searchParams.get('email')?.toLowerCase();
    console.log(id, 'this is the id');
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: id ? id : undefined,
            },
            include: {
                comments: true,  // Include all related comments
            },
        });
        console.log(user, 'this is a user with comments');
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
