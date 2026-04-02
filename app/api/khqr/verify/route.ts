import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { AppError, handleApiError } from "@/lib/errors";

interface VerifyRequest {
  md5: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    const body = (await request.json()) as VerifyRequest;

    if (!body.md5) {
      throw new AppError("Missing md5", 400, "INVALID_REQUEST");
    }

    const bakongToken = process.env.BAKONG_TOKEN;
    if (!bakongToken) {
      throw new AppError("Bakong token not configured", 500, "SERVER_ERROR");
    }

    // Call Bakong API to check transaction status
    const response = await fetch(
      "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bakongToken}`,
        },
        body: JSON.stringify({ md5: body.md5 }),
      }
    );

    if (!response.ok) {
      throw new AppError(
        "Failed to verify transaction with Bakong",
        response.status,
        "BAKONG_ERROR"
      );
    }

    const data = (await response.json()) as any;

    // Bakong API returns responseCode: 0 for a successful/found transaction
    const isPaid = data?.responseCode === 0;

    return NextResponse.json({ paid: isPaid });
  } catch (error) {
    return handleApiError(error);
  }
}
