import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const data = await req.json()
    

    try {
        const test = await prisma.post.create({
            data: {
                content: data.content,
                date: new Date,
                email: JSON.parse(data.email.toLowerCase()),
            }
        })
        return NextResponse.json({ hello: test });
    } catch (error) {
        console.log(error)
    }


}   