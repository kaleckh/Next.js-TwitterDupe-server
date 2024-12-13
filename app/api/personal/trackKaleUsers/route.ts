import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const data = await req.json();
    try {        
        const existingEntry = await prisma.portfolioData.findUnique({
            where: { ip: data.ip },
        });
        if (existingEntry) {
            await prisma.portfolioData.update({
                where: { ip: data.ip },
                data: { counter: existingEntry.counter + 1 },
            });
            return NextResponse.json("Counter updated successfully");
        } else {            
            await prisma.portfolioData.create({
                data: {
                    ip: data.ip,
                    date: new Date(),
                    counter: 1, 
                },
            });
            return NextResponse.json("New IP added successfully");
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}