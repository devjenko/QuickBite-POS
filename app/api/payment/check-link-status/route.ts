import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

// This handles GET requests to /api/payment/check-link-status?provider=ABA
export async function GET(req: NextRequest) {
  //  Check authentication
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // : Get provider from query params

    // URL will be: /api/payment/check-link-status?provider=ABA
    const searchParams = req.nextUrl.searchParams;
    const provider = searchParams.get("provider") || "ABA"; // Default to ABA

    console.log(
      `[Check Link Status] Checking ${provider} for user ${session.user.id}`
    );

    //  Check if account is linked

    const linkedAccount = await prisma.linkedAccount.findUnique({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider: provider,
        },
      },
      select: {
        id: true,
        provider: true,
        maskAccount: true,
        isActive: true,
        tokenExpiresAt: true,
        linkedAt: true,
        lastUsed: true,
      },
    });

    //  Check for pending link requests

    // Also check if there's a pending request (QR shown but not scanned)
    const pendingRequest = await prisma.paymentLinkRequest.findFirst({
      where: {
        userId: session.user.id,
        provider: provider,
        status: "pending",
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc", // Get most recent
      },
    });

    // Return status

    return NextResponse.json({
      linked: !!linkedAccount, // true if linked, false if not
      provider: provider,
      account: linkedAccount
        ? {
            maskAccount: linkedAccount.maskAccount,
            linkedAt: linkedAccount.linkedAt,
            lastUsed: linkedAccount.lastUsed,
            expiresAt: linkedAccount.tokenExpiresAt,
            isActive: linkedAccount.isActive,
            // Check if expiring soon (within 7 days)
            expiringSoon:
              linkedAccount.tokenExpiresAt <
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }
        : null,
      pendingRequest: pendingRequest
        ? {
            status: pendingRequest.status,
            expiresAt: pendingRequest.expiresAt,
            // Calculate time remaining
            timeRemaining: Math.max(
              0,
              pendingRequest.expiresAt.getTime() - Date.now()
            ),
          }
        : null,
    });
  } catch (error) {
    console.error("[Check Link Status] Error:", error);

    return NextResponse.json(
      {
        error: "Failed to check link status",
        linked: false,
      },
      { status: 500 }
    );
  }
}
