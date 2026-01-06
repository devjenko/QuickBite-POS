import { NextRequest, NextResponse } from "next/server";
import {
  PaymentProviderFactory,
  ProviderType,
} from "@/lib/payment-providers/factory";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await context.params;
    const providerName = provider.toUpperCase();

    console.log(`[link callback] Received callback from ${providerName}`);

    const payload = await req.json();

    console.log(`[link callback] Payload:`, JSON.stringify(payload, null, 2));

    const validProviders: ProviderType[] = ["ABA", "WING"];
    if (!validProviders.includes(providerName as ProviderType)) {
      return NextResponse.json(
        { error: `Invalid provider: ${providerName}` },
        { status: 400 }
      );
    }

    const paymentProvider = PaymentProviderFactory.getProvider(
      providerName as ProviderType
    );

    const linkedData = await paymentProvider.handleLinkCallback(payload);

    console.log(`[Link Callback] Account linked successfully`);
    console.log(`[Link Callback] Mask account: ${linkedData.mask_account}`);

    return NextResponse.json({
      received: true,
      message: "Account linked successfully",
    });
  } catch (error) {
    console.error("[Link Callback] Error processing callback:", error);

    return NextResponse.json(
      {
        received: false,
        error:
          error instanceof Error ? error.message : "Failed to process callback",
      },
      { status: 200 }
    );
  }
}
