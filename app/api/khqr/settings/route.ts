import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { AppError, handleApiError } from "@/lib/errors";

interface SettingsRequest {
  bakongAccountId: string;
}

// Validate Bakong account ID format (name@bankcode)
// Examples: brandon_jenkins@bkrt, mystore@ababank, store123@acleda
function validateBakongAccountId(accountId: string): boolean {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
  return pattern.test(accountId);
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    let body: SettingsRequest;
    try {
      body = (await request.json()) as SettingsRequest;
    } catch (parseErr) {
      throw new AppError("Invalid request format", 400, "INVALID_REQUEST");
    }

    if (!body.bakongAccountId || typeof body.bakongAccountId !== "string") {
      throw new AppError("Missing or invalid bakongAccountId", 400, "INVALID_REQUEST");
    }

    const accountId = body.bakongAccountId.trim();

    // Validate format (name@bankcode)
    if (!validateBakongAccountId(accountId)) {
      throw new AppError(
        "Invalid Bakong account format. Use format: name@bankcode (e.g., brandon_jenkins@bkrt, mystore@ababank)",
        400,
        "INVALID_FORMAT"
      );
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { bakongAccountId: accountId },
      select: { bakongAccountId: true },
    });

    return NextResponse.json({
      success: true,
      bakongAccountId: user.bakongAccountId,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { bakongAccountId: true },
    });

    return NextResponse.json({
      bakongAccountId: user?.bakongAccountId || null,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
