import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { AppError, handleApiError } from "@/lib/errors";

// Using require for CommonJS bakong-khqr package
const { BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr");

interface GenerateQRRequest {
  amount: number;
  orderId: string;
  merchantName: string;
  bakongAccountId: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    let body: GenerateQRRequest;
    try {
      body = (await request.json()) as GenerateQRRequest;
    } catch (parseErr) {
      throw new AppError("Invalid request format", 400, "INVALID_REQUEST");
    }

    // Validate required fields
    if (!body.amount || !body.orderId || !body.merchantName || !body.bakongAccountId) {
      throw new AppError("Missing required fields", 400, "INVALID_REQUEST");
    }

    if (body.amount <= 0) {
      throw new AppError("Amount must be greater than 0", 400, "INVALID_AMOUNT");
    }

    const bakongToken = process.env.BAKONG_TOKEN;
    if (!bakongToken) {
      throw new AppError("Bakong token not configured", 500, "SERVER_ERROR");
    }

    // Generate dynamic KHQR with 10 minute expiration
    const expiryDate = new Date(Date.now() + 10 * 60 * 1000);

    let result: any;
    try {
      // Create individual info for KHQR generation
      // IndividualInfo(bakongAccountID, merchantName, merchantCity, optional)
      const individualInfo = new IndividualInfo(
        body.bakongAccountId,
        body.merchantName,
        body.merchantName, // city (using merchant name)
        {
          currency: khqrData.currency.usd,
          amount: body.amount,
          billNumber: body.orderId,
          expirationTimestamp: expiryDate.getTime(),
        }
      );

      // Generate QR code
      const bakongKHQR = new BakongKHQR();
      result = bakongKHQR.generateIndividual(individualInfo);

      // Check for errors - status.code of 0 means success
      if (result.status && result.status.code !== 0) {
        throw new AppError(
          `Failed to generate KHQR: Code ${result.status.code} - ${result.status.message || "Unknown error"}`,
          500,
          "KHQR_GENERATION_ERROR"
        );
      }

      if (result.code && result.code !== 0) {
        throw new AppError(
          `Failed to generate KHQR: ${result.code}`,
          500,
          "KHQR_GENERATION_ERROR"
        );
      }
    } catch (khqrErr) {
      throw new AppError(
        `Failed to generate KHQR: ${khqrErr instanceof Error ? khqrErr.message : "Unknown error"}`,
        500,
        "KHQR_GENERATION_ERROR"
      );
    }

    if (!result || !result.data) {
      throw new AppError("Invalid KHQR response from library", 500, "INVALID_KHQR_RESPONSE");
    }

    return NextResponse.json({
      qr: result.data.qr,
      md5: result.data.md5,
      expireDate: expiryDate.toISOString(),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
