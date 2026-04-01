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
      console.warn("[KHQR Settings] User not authenticated");
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    let body: SettingsRequest;
    try {
      body = (await request.json()) as SettingsRequest;
    } catch (parseErr) {
      console.error("[KHQR Settings] Failed to parse request body:", parseErr);
      throw new AppError("Invalid request format", 400, "INVALID_REQUEST");
    }

    if (!body.bakongAccountId || typeof body.bakongAccountId !== "string") {
      console.warn("[KHQR Settings] Missing or invalid bakongAccountId:", body.bakongAccountId);
      throw new AppError("Missing or invalid bakongAccountId", 400, "INVALID_REQUEST");
    }

    const accountId = body.bakongAccountId.trim();

    // Validate format (name@bankcode)
    if (!validateBakongAccountId(accountId)) {
      console.warn("[KHQR Settings] Invalid format for account ID:", accountId);
      throw new AppError(
        "Invalid Bakong account format. Use format: name@bankcode (e.g., brandon_jenkins@bkrt, mystore@ababank)",
        400,
        "INVALID_FORMAT"
      );
    }

    // Save to database
    console.log(`[KHQR Settings] Saving Bakong account ${accountId} for user ${session.user.id}`);
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { bakongAccountId: accountId },
      select: { bakongAccountId: true },
    });

    console.log(`[KHQR Settings] Successfully saved Bakong account for user ${session.user.id}`);
    return NextResponse.json({
      success: true,
      bakongAccountId: user.bakongAccountId,
    });
  } catch (error) {
    console.error("[KHQR Settings] Error in PATCH handler:", error);
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
