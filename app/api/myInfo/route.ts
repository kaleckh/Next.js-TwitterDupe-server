import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'


const prisma = new PrismaClient()
export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('email')
    console.log(id, 'this is the id')
    try {
        const posts = await prisma.user.findFirst({
            where: {
                email: id ? JSON.parse(id) : undefined
            }
        })
        console.log(posts, 'this is a user')
        return NextResponse.json({ Hello: posts });
    } catch (error) {
        console.log(error)
    }

}   