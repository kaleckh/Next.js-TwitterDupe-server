import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email')        
        
        const test = await prisma.conversation.findMany({
            where:
            {
                me: email || ''
            }

        })
        console.log(test, 'test')
        return NextResponse.json({ Posts: test });
    } catch (error) {
        console.log(error)
    }
    // console.log(req, "testing info")

}   