import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

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

    // store user ID in cookie, for account owners trying to access settings (only user in current session after password verification will be able to access settings page within 15 min)

    const cookieStore = await cookies();
    cookieStore.set("settings-verified", session.user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
