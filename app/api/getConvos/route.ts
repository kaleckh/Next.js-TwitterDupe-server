import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id')        
        
        const test = await prisma.user.findUnique({
            where:
            {
                id: id || ''
            },
            include: {
                conversations: {
                    include: {
                        user: true
                    }
                }
            }
        })
        console.log(test, 'test')
        return NextResponse.json({ user: test });
    } catch (error) {
        console.log(error)
    }
    // console.log(req, "testing info")

}   