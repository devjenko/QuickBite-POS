import crypto from "crypto";
import moment from "moment";
import {
  PaymentProvider,
  LinkQRResponse,
  PaymentQRResponse,
  LinkedAccountData,
} from "./types";
import prisma from "../prisma";
import { encrypt, decrypt } from "@/lib/encryption";

export class ABAProvider implements PaymentProvider {
  name = "ABA";

  //   Platform credentials
  private merchantId: string;
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // Read from environment variables (stored in .env file)
    this.merchantId = process.env.PAYWAY_MERCHANT_ID!;
    this.apiKey = process.env.PAYWAY_API_KEY!;

    // Use sandbox for testing, production for real money
    this.baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.PAYWAY_PRODUCTION_URL!
        : process.env.PAYWAY_SANDBOX_URL!;
  }

  async generateLinkQR(userId: string): Promise<LinkQRResponse> {
    // Get current time in ABA required format
    const reqTime = moment().format("YYYYMMDDHHmmss");

    // Create unique ID for linking attempt
    const returnParam = `aba_link${userId}_${Date.now()}`;

    // Create callback URL
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/link-callback/aba`;

    // ABA requires this URL to be base64 encoded
    const callbackUrlBase64 = Buffer.from(callbackUrl).toString("base64");

    // Generate a hash
    const hashString = `${this.merchantId}${reqTime}`;

    const hash = crypto
      .createHmac("sha512", this.apiKey)
      .update(hashString)
      .digest("base64");

    //   Make the API call to ABA
    const response = await fetch(`${this.baseUrl}/api/aof/request-qr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reqTime: reqTime,
        merchantId: this.merchantId,
        returnParam: returnParam,
        hash: hash,
      }),
    });

    // Get response from ABA
    const data = await response.json();

    // Verify status
    if (data.status?.code !== "00") {
      throw new Error(data.status?.message || "Failed to generate link QR");
    }

    // Save linking attempt to DB
    await prisma.paymentLinkRequest.create({
      data: {
        userId,
        provider: "ABA",
        returnParam,
        status: "pending",
        expiresAt: new Date(data.expire_in * 1000),
      },
    });

    return {
      qr_image: data.qr_image,
      qr_string: data.qr_string,
      deeplink: data.deeplink,
      expire_in: data.expire_in,
    };
  }

  //    Receives and saves the tokens when user scans the QR code
  async handleLinkCallback(payload: any): Promise<LinkedAccountData> {
    const { status, return_params } = payload;

    // Check if linking was successful
    if (status !== 0 || return_params.card_status.status !== "00") {
      throw new Error("Account linking failed");
    }

    // ctid = Consumer Token ID (unique ID for this linked account)
    // pwt = PayWay Token (token used for payments)
    // mask_account = Safe display version like "*****1234"
    // expired_in = How many seconds until token expires (5184000 = 60 days)

    const { ctid, card_status, return_param } = return_params;
    const { pwt, mask_account, expired_in } = card_status;

    // Find original link request
    const linkRequest = await prisma.paymentLinkRequest.findUnique({
      where: {
        returnParam: return_param,
      },
    });

    if (!linkRequest) {
      throw new Error("Link request not found - invalid or expired");
    }

    // Check if it's already been used
    if (linkRequest.status === "completed") {
      throw new Error("This link request has already been completed");
    }

    // Check if it expired
    if (new Date() > linkRequest.expiresAt) {
      throw new Error("Link request has expired");
    }

    // Encrypt tokens before saving
    const encryptedCtid = encrypt(ctid);
    const encryptedPwt = encrypt(pwt);

    // Check if user already has this provider linked
    const existingLink = await prisma.linkedAccount.findUnique({
      where: {
        userId_provider: {
          userId: linkRequest.userId,
          provider: "ABA",
        },
      },
    });

    // If user already has ABA linked - update it instead of creating new
    if (existingLink) {
      await prisma.linkedAccount.update({
        where: { id: existingLink.id },
        data: {
          ctidEncrypted: encryptedCtid,
          pwtEncrypted: encryptedPwt,
          maskAccount: mask_account,
          tokenExpiresAt: new Date(Date.now() + expired_in * 1000),
          linkedAt: new Date(),
          isActive: true,
        },
      });
    } else {
      // Create new linked account
      await prisma.linkedAccount.create({
        data: {
          userId: linkRequest.userId,
          provider: "ABA",
          ctidEncrypted: encryptedCtid,
          pwtEncrypted: encryptedPwt,
          maskAccount: mask_account,
          tokenExpiresAt: new Date(Date.now() + expired_in * 1000),
          isActive: true,
        },
      });
    }

    //   Mark linked request as completed
    await prisma.paymentLinkRequest.update({
      where: { id: linkRequest.id },
      data: {
        status: "completed",
        updatedAt: new Date(),
      },
    });

    return {
      ctid,
      pwt,
      mask_account,
      expired_in,
    };
  }

  //   Creates a QR code for customers to pay for an order
  async generatePaymentQR(orderId: string): Promise<PaymentQRResponse> {
    // Get the order details from db
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        merchant: {
          include: {
            linkedAccounts: {
              where: {
                provider: "ABA",
                isActive: true,
              },
            },
          },
        },
        customer: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    // Check if merchant has ABA linked
    const linkedAccount = order.merchant.linkedAccounts[0];

    if (!linkedAccount) {
      throw new Error("Merchant has not linked their ABA account");
    }
    // Check if token is expired
    if (new Date() > linkedAccount.tokenExpiresAt) {
      throw new Error("Merchant ABA token has expired - needs to relink");
    }
    // Decrypt merchant's tokens
    const ctid = decrypt(linkedAccount.ctidEncrypted);
    const pwt = decrypt(linkedAccount.pwtEncrypted);

    // Prepare payment request data
    const reqTime = moment().format("YYYYMMDDHHmmss");

    // Create new transaction ID
    const tranId = `aba_order_${orderId}_${Date.now()}`;

    // Prepare items list
    const items = order.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Convert to JSON string then to base64 (ABA requirements)
    const itemsJson = JSON.stringify(items);
    const itemsBase64 = Buffer.from(itemsJson).toString("base64");

    // Prepare callback URL
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/aba`;
    const callbackBase64 = Buffer.from(callbackUrl).toString("base64");

    // Generate hash for payment request

    // Build the hash string
    const hashString =
      reqTime + // Request time
      this.merchantId + //  platform merchant ID
      tranId + // Transaction ID
      order.total.toString() + // Amount
      itemsBase64 + // Items (base64)
      "" + // shipping (empty)
      ctid + // Merchant's consumer token ID
      pwt + // Merchant's payway token
      order.customer.firstName + // Customer first name
      order.customer.lastName + // Customer last name
      order.customer.email + // Customer email
      order.customer.phone + // Customer phone
      "purchase" + // Transaction type
      "abapay_khqr" + // Payment method
      callbackBase64 + // Callback URL (base64)
      "" + // cancel_url (empty)
      "" + // continue_success_url (empty)
      "" + // return_deeplink (empty)
      order.currency; // Currency (USD or KHR)

    // Create the hash
    const hash = crypto
      .createHmac("sha512", this.apiKey)
      .update(hashString)
      .digest("base64");

    //   Make API call to ABA

    // Note: This uses form-urlencoded, not JSON
    const params = new URLSearchParams({
      req_time: reqTime,
      merchant_id: this.merchantId,
      tran_id: tranId,
      ctid: ctid, // Include merchant's tokens
      pwt: pwt,
      firstname: order.customer.firstName,
      lastname: order.customer.lastName,
      email: order.customer.email || "",
      phone: order.customer.phone || "",
      amount: order.total.toString(),
      type: "purchase",
      payment_option: "abapay_khqr",
      items: itemsBase64,
      currency: order.currency,
      return_url: callbackBase64,
      hash: hash,
    });

    const response = await fetch(
      `${this.baseUrl}/api/payment-gateway/v1/payments/purchase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    const data = await response.json();

    // Check if QR generation succeeded
    if (data.status?.code !== "0") {
      throw new Error(data.status?.message || "Failed to generate payment QR");
    }

    // Save transaction info to order
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paywayTranId: tranId,
        paymentProvider: "ABA",
        paymentStatus: "pending",
        qrGeneratedAt: new Date(),
        qrExpiresAt: new Date(Date.now() + 6 * 60 * 1000),
        linkedAccountId: linkedAccount.id,
      },
    });

    // Update last used time for linked account
    await prisma.linkedAccount.update({
      where: { id: linkedAccount.id },
      data: { lastUsed: new Date() },
    });

    return {
      qrImage: data.qrImage,
      qrString: data.qrString,
      deeplink: data.abapay_deeplink,
      amount: parseFloat(data.amount),
      currency: data.currency,
    };
  }

  async verifyPayment(tranId: string): Promise<boolean> {
    // Find the order by transaction ID
    const order = await prisma.order.findUnique({
      where: { paywayTranId: tranId },
      include: {
        linkedAccount: true,
      },
    });

    if (!order) {
      throw new Error("Order not found for transaction ID: " + tranId);
    }

    // Prepare verification request

    const reqTime = moment().format("YYYYMMDDHHmmss");

    // Hash formula for Check Transaction: req_time + merchant_id + tran_id
    const hashString = reqTime + this.merchantId + tranId;
    const hash = crypto
      .createHmac("sha512", this.apiKey)
      .update(hashString)
      .digest("base64");

    //  Call Check Transaction API

    const response = await fetch(
      `${this.baseUrl}/api/payment-gateway/v1/payments/check-transaction-2`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          req_time: reqTime,
          merchant_id: this.merchantId,
          tran_id: tranId,
          hash: hash,
        }),
      }
    );

    const data = await response.json();

    // Check response

    // Status codes:
    // "0" = Approved/Paid
    // "1" = Created
    // "2" = Pending
    // "3" = Declined
    // "4" = Refunded
    // "5" = Wrong Hash
    // "6" = Transaction not found

    if (data.status?.code === "0") {
      // Payment is confirmed!
      return true;
    }

    // Any other status means not paid
    return false;
  }

  async unlinkAccount(userId: string): Promise<boolean> {
    // Find the linked account

    const linkedAccount = await prisma.linkedAccount.findUnique({
      where: {
        userId_provider: {
          userId: userId,
          provider: "ABA",
        },
      },
    });

    if (!linkedAccount) {
      throw new Error("No ABA account linked for this user");
    }

    //  Get decrypted tokens

    const ctid = decrypt(linkedAccount.ctidEncrypted);
    const pwt = decrypt(linkedAccount.pwtEncrypted);

    //  Prepare remove account request

    const reqTime = moment().format("YYYYMMDDHHmmss");

    // Hash formula for Remove Account: merchant_id + req_time + ctid + pwt
    const hashString = this.merchantId + reqTime + ctid + pwt;
    const hash = crypto
      .createHmac("sha512", this.apiKey)
      .update(hashString)
      .digest("base64");

    // Call Remove Account API

    const response = await fetch(`${this.baseUrl}/api/aof/remove-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        req_time: reqTime,
        merchant_id: this.merchantId,
        ctid: ctid,
        pwt: pwt,
        hash: hash,
      }),
    });

    const data = await response.json();

    // Check if removal was successful

    if (data.status?.code !== "00") {
      throw new Error(
        data.status?.message || "Failed to remove account from ABA"
      );
    }

    //  Delete from our database

    await prisma.linkedAccount.delete({
      where: { id: linkedAccount.id },
    });

    return true;
  }

  async renewToken(userId: string): Promise<boolean> {
    //  Find the linked account

    const linkedAccount = await prisma.linkedAccount.findUnique({
      where: {
        userId_provider: {
          userId: userId,
          provider: "ABA",
        },
      },
    });

    if (!linkedAccount) {
      throw new Error("No ABA account linked for this user");
    }

    //  Get decrypted tokens

    const ctid = decrypt(linkedAccount.ctidEncrypted);
    const pwt = decrypt(linkedAccount.pwtEncrypted);

    //  Prepare renew request

    const reqTime = moment().format("YYYYMMDDHHmmss");

    // Hash formula for Renew: merchant_id + ctid + pwt + req_time
    const hashString = this.merchantId + ctid + pwt + reqTime;
    const hash = crypto
      .createHmac("sha512", this.apiKey)
      .update(hashString)
      .digest("base64");

    //  Call Renew Expired Account API

    const response = await fetch(
      `${this.baseUrl}/api/aof/renew-expired-account`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          req_time: reqTime,
          merchant_id: this.merchantId,
          ctid: ctid,
          pwt: pwt,
          hash: hash,
        }),
      }
    );

    const data = await response.json();

    //  Check if renewal was successful

    if (data.status?.code !== "00") {
      throw new Error(data.status?.message || "Failed to renew token");
    }

    //  Update expiration date in database

    // Token is renewed for another 60 days
    await prisma.linkedAccount.update({
      where: { id: linkedAccount.id },
      data: {
        tokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        updatedAt: new Date(),
      },
    });

    return true;
  }
}
