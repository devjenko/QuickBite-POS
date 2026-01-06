import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  PaymentProviderFactory,
  ProviderType,
} from "@/lib/payment-providers/factory";

// Handles POST requests to /api/payment/link-account
export async function POST(req: NextRequest) {
  console.log("ENCRYPTION_KEY length:", process.env.ENCRYPTION_KEY?.length);
  console.log("PAYWAY_API_KEY set?", !!process.env.PAYWAY_API_KEY);

  console.log("PAYWAY_MERCHANT_ID:", process.env.PAYWAY_MERCHANT_ID);
  console.log("PAYWAY_API_KEY:", process.env.PAYWAY_API_KEY);
  console.log("PAYWAY_BASE_URL:", process.env.PAYWAY_BASE_URL);

  if (!process.env.ENCRYPTION_KEY) {
    return new Response(
      JSON.stringify({ error: "ENCRYPTION_KEY is missing" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!process.env.PAYWAY_API_KEY) {
    return new Response(
      JSON.stringify({ error: "PAYWAY_API_KEY is missing" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Check auth
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "You must be logged in to link an account" },
      { status: 401 }
    );
  }

  try {
    //   Get provider from request body

    const body = await req.json();
    const { provider } = body;

    // Validate that provider was sent
    if (!provider) {
      return NextResponse.json(
        { error: 'Provider is required (eg., "ABA")' },
        { status: 400 }
      );
    }
    // Validate that provider is one we support
    const validProviders: ProviderType[] = ["ABA", "WING"];
    if (!validProviders.includes(provider)) {
      return NextResponse.json(
        {
          error: `Invalid provider. Must be one of: ${validProviders.join(", ")}`,
        },
        { status: 400 }
      );
    }
    console.log(
      `[Link Account] User ${session.user.id} requesting to link ${provider}`
    );

    // Get the payment provider
    const paymentProvider = PaymentProviderFactory.getProvider(
      provider as ProviderType
    );

    // Generate the linking QR
    const qrData = await paymentProvider.generateLinkQR(session.user.id);

    console.log(`[Link Account] QR generated successfully for ${provider}`);

    return NextResponse.json({
      success: true,
      provider: provider,
      qr_image: qrData.qr_image,
      qr_string: qrData.qr_string,
      deeplink: qrData.deeplink,
      expire_in: qrData.expire_in,
      expires_at: new Date(Date.now() + qrData.expire_in * 1000).toISOString(),
    });
  } catch (error) {
    console.error("[Link Account] Error:", error);

    // Return a proper error response
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate linking QR code",
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined, // Show details only in development
      },
      { status: 500 } // 500 = Internal Server Error
    );
  }
}
