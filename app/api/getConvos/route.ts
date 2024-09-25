import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email')        
        
        const test = await prisma.user.findUnique({
            where:
            {
                email: email || ''
            },
            include: {
                conversations: true
            }
        })
        console.log(test, 'test')
        return NextResponse.json({ Posts: test });
    } catch (error) {
        console.log(error)
    }
    // console.log(req, "testing info")

}   