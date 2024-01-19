// Import necessary modules
import bcrypt from "bcrypt";
import prisma from "@/libs/prismabd";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // Parse request body
    const body = await request.json();
    const { name, email, password } = body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user using Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    // Return the user data in the response
    return NextResponse.json(user);
}
