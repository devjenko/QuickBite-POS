import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { AppError, handleApiError } from "@/lib/errors";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    const qrCodes = await prisma.bankQRCode.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ qrCodes });
  } catch (error) {
    return handleApiError(error);
  }
}
