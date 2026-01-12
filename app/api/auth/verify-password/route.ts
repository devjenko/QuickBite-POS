import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { AppError, handleApiError } from "@/lib/errors";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user.businessId) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    const { password } = await req.json();

    if (!password) {
      throw new AppError("Password is required", 400, "VALIDATION_ERROR");
    }

    // fetch user from db
    const user = await prisma.user.findUnique({
      where: { businessId: session?.user.businessId },
      select: { password: true },
    });

    if (!user || !user?.password) {
      throw new AppError("User not found", 404, "NOT_FOUND");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // if the password is not valid
    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401, "INVALID_PASSWORD");
    }

    // store user ID in cookie, for account owners trying to access settings
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
    return handleApiError(error);
  }
}
