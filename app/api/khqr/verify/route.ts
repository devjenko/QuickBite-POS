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

    // Use proxy in production (Bakong API blocks non-Cambodian IPs)
    // Fall back to direct Bakong API call for local development
    const proxyUrl = process.env.BAKONG_PROXY_URL;
    const proxySecret = process.env.BAKONG_PROXY_SECRET;
    const bakongToken = process.env.BAKONG_TOKEN;

    let response: Response;

    if (proxyUrl && proxySecret) {
      response = await fetch(`${proxyUrl}/proxy/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-proxy-key": proxySecret,
        },
        body: JSON.stringify({ md5: body.md5 }),
      });
    } else if (bakongToken) {
      response = await fetch(
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
    } else {
      throw new AppError("Bakong verification not configured", 500, "SERVER_ERROR");
    }

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
