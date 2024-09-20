import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(data, 'update user data');
    try {
        const updatedData: {
            followers?: string[];
            following?: string[];
        } = {};

        // Check and update only specific fields
        if (data.followers) {
            updatedData.followers = data.followers;
        }

        if (data.following) {
            updatedData.following = data.following;
        }

        // Update the user with only the provided fields
        const updateUser = await prisma.user.update({
            where: {
                email: data.email.toLowerCase(), // Assuming email is unique and used for identification
            },
            data: updatedData,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
