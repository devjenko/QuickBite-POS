import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { AppError, handleApiError } from "@/lib/errors";

interface MarkPaidRequest {
  orderId: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    const body = (await request.json()) as MarkPaidRequest;

    if (!body.orderId) {
      throw new AppError("Missing orderId", 400, "INVALID_REQUEST");
    }

    // Update order to paid status
    const order = await prisma.order.update({
      where: { id: body.orderId },
      data: {
        paymentStatus: "paid",
        paidAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
