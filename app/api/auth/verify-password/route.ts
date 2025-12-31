import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user.businessId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // fetch user from db
    const user = await prisma.user.findUnique({
      where: { businessId: session?.user.businessId },
      select: { password: true },
    });

    if (!user || !user?.password) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // if the password is not valid
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
