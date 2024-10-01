import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
export const dynamic = 'force-dynamic';


const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id')   
        if (!id) throw new Error('no id')     
        
        const test = await prisma.conversation.findMany({
            where: {
                users: {
                    some: {
                        userId: id                        
                    }
                }
            },
            include: {
                users: {
                    where: {
                        userId: {
                            not: id
                        }
                    },
                    include: {
                        user: true
                    }
                },
                messages: {
                    orderBy: {
                        date: 'desc'
                    }
                }
            }
        })
        console.log(test, 'these are the conversations')
        return NextResponse.json(test );
    } catch (error) {
        console.log(error)
    }
    // console.log(req, "testing info")

}   