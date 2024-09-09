import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email')

    try {
        const test = await prisma.post.findMany({
            where: {
                email: email || ''
            }
        })
        console.log(test, "this is get all posts info")
        return NextResponse.json({ Posts: test });
    } catch (error) {
        console.log(error)
    }
    // console.log(req, "testing info")

}   