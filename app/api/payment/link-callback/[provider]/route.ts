import { NextRequest, NextResponse } from "next/server";
import {
  PaymentProviderFactory,
  ProviderType,
} from "@/lib/payment-providers/factory";

export async function POST(
  req: NextRequest,
  { params }: { params: { provider: string } }
) {
  try {
    // Get the provider from the URL
    const providerName = params.provider.toUpperCase();

    console.log(`[link callback] Received callback from ${providerName}`);

    // Get the payload from request
    const payload = await req.json();

    console.log(`[link callback] Payload:`, JSON.stringify(payload, null, 2));

    // Validate provider is supported
    const validProviders: ProviderType[] = ["ABA", "WING"];
    if (!validProviders.includes(providerName as ProviderType)) {
      console.error(`[Link Callback] Invalid provider: ${providerName}`);
      return NextResponse.json(
        { error: `Invalid provider: ${providerName}` },
        { status: 400 }
      );
    }

    // Get the payment provider
    const paymentProvider = PaymentProviderFactory.getProvider(
      providerName as ProviderType
    );

    // Process callback
    const linkedData = await paymentProvider.handleLinkCallback(payload);

    console.log(`[Link Callback] Account linked successfully`);
    console.log(`[Link Callback] Mask account: ${linkedData.mask_account}`);

    return NextResponse.json({
      received: true,
      message: "Account linked successfully",
    });
  } catch (error) {
    console.error("[Link Callback] Error processing callback:", error);

    // Even on error, return 200 OK to ABA
    // Why? If we return an error, ABA might retry the callback
    // But we'll log the error for debugging
    return NextResponse.json(
      {
        received: false,
        error:
          error instanceof Error ? error.message : "Failed to process callback",
      },
      { status: 200 } // Return 200 even on error to prevent retries
    );
  }
}
