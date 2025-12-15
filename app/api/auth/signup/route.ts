import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Helper function to generate staff ID
function generateStaffId(firstName: string, lastName: string): string {
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  return `${firstName.toLowerCase()}${lastName[0].toLowerCase()}${randomCode}@quickbite`;
}

// Helper function to check if staffId is unique, regenerate if not
async function generateUniqueStaffId(
  firstName: string,
  lastName: string
): Promise<string> {
  let staffId = generateStaffId(firstName, lastName);
  let existingUser = await prisma.user.findUnique({
    where: { staffId },
  });

  // Keep generating until we get a unique staffId
  while (existingUser) {
    staffId = generateStaffId(firstName, lastName);
    existingUser = await prisma.user.findUnique({
      where: { staffId },
    });
  }

  return staffId;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { firstName, lastName, password } = body;

    // Validate required fields
    if (!firstName || !lastName || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Trim whitespace from names
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    // Validate name lengths
    if (trimmedFirstName.length === 0 || trimmedLastName.length === 0) {
      return NextResponse.json(
        { error: "Names cannot be empty" },
        { status: 400 }
      );
    }

    // Generate unique staff ID
    const staffId = await generateUniqueStaffId(
      trimmedFirstName,
      trimmedLastName
    );

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        staffId,
        password: hashedPassword,
      },
    });

    // Return success with staffId (don't return password!)
    return NextResponse.json(
      {
        message: "Account created successfully",
        staffId: user.staffId,
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
