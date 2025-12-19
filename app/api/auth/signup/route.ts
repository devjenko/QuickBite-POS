import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Helper function to generate staff ID
function generateBusinessId(businessName: string): string {
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const base = businessName.trim().replace(/\s+/g, "");
  return `${base}${randomCode}@quickbite`;
}

// Helper function to check if staffId is unique, regenerate if not
async function generateUniqueBusinessId(businessName: string): Promise<string> {
  let businessId = generateBusinessId(businessName);
  let existingUser = await prisma.user.findUnique({
    where: { businessId },
  });

  // Keep generating until we get a unique staffId
  while (existingUser) {
    businessId = generateBusinessId(businessName);
    existingUser = await prisma.user.findUnique({
      where: { businessId },
    });
  }

  return businessId;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { businessName, password } = body;

    // Validate required fields
    if (!businessName || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Trim whitespace from names
    const trimmedBusinessName = businessName.trim();

    // Validate name lengths
    if (trimmedBusinessName.length === 0) {
      return NextResponse.json(
        { error: "Names cannot be empty" },
        { status: 400 }
      );
    }

    // Generate unique staff ID
    const businessId = await generateUniqueBusinessId(trimmedBusinessName);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        businessId,
        password: hashedPassword,
      },
    });

    // Return success with staffId (don't return password!)
    return NextResponse.json(
      {
        message: "Account created successfully",
        businessId: user.businessId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
