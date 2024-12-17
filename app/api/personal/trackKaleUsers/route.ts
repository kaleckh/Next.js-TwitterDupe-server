import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(data, 'this data');
    try {
        // Check if the IP already exists in the database
        const existingEntry = await prisma.portfolioData.findUnique({
            where: { ip: data.ip },
        });
        if (existingEntry) {
            // If IP exists, update the counter by incrementing it
            await prisma.portfolioData.update({
                where: { ip: data.ip },
                data: { counter: existingEntry.counter + 1, date: new Date() },

            });
            return NextResponse.json("Counter updated successfully");
        } else {
            // If IP does not exist, create a new entry
            await prisma.portfolioData.create({
                data: {
                    ip: data.ip,
                    date: new Date(),
                    counter: 1, // Initialize counter at 1 for new entries
                },
            });
            return NextResponse.json("New IP added successfully");
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}