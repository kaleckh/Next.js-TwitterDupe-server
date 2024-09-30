import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const origin = req.headers.get('origin');

    // Add CORS headers to allow specific domains or all domains
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', origin || '*'); // Allow all domains or restrict to specific origin
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Handle preflight requests
        return new Response(null, {
            headers,
            status: 204,
        });
    }
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                date: 'desc',
            },
            include: {
                comments: true,
                owner: true
            },
        });
        console.log(posts, 'this is post info');
        return NextResponse.json({ Posts: posts });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
