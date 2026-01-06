import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { PaymentProviderFactory } from "@/lib/payment-providers/factory";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  //  Check authentication

  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    //  Get request data

    // Frontend sends: { orderId: "order_123", provider: "ABA" }
    const body = await req.json();
    const { orderId, provider } = body;

    // Validate inputs
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider is required (e.g., "ABA")' },
        { status: 400 }
      );
    }

    console.log(
      `[Generate QR] Creating payment QR for order ${orderId} using ${provider}`
    );

    // Verify order belongs to this user

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        merchantId: true,
        paymentStatus: true,
        total: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.merchantId !== session.user.id) {
      return NextResponse.json(
        { error: "You do not have permission to generate QR for this order" },
        { status: 403 } // 403 = Forbidden
      );
    }

    // Check if already paid
    if (order.paymentStatus === "paid") {
      return NextResponse.json(
        { error: "This order has already been paid" },
        { status: 400 }
      );
    }

    //  Get the payment provider

    const paymentProvider = PaymentProviderFactory.getProvider(provider);

    //  Generate payment QR

    // This calls generatePaymentQR from aba-provider.ts
    // It will:
    // - Get the merchant's linked account tokens
    // - Call ABA's Purchase API with the tokens
    // - Save transaction ID to the order
    // - Return QR data
    const qrData = await paymentProvider.generatePaymentQR(orderId);

    console.log(`[Generate QR] Payment QR generated successfully`);
    console.log(`[Generate QR] Amount: ${qrData.amount} ${qrData.currency}`);

    // Return QR data

    return NextResponse.json({
      success: true,
      provider: provider,
      orderId: orderId,
      qrImage: qrData.qrImage, // The QR code image
      qrString: qrData.qrString, // Raw QR data
      deeplink: qrData.deeplink, // Deep link for mobile apps
      amount: qrData.amount, // Payment amount
      currency: qrData.currency, // USD or KHR
      expiresIn: 6 * 60 * 1000, // 6 minutes in milliseconds
      expiresAt: new Date(Date.now() + 6 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    console.error("[Generate QR] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate payment QR",
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
