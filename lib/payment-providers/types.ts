export interface PaymentProvider {
  name: string;

  //   Generate QR code for user linking accounts
  generateLinkQR(userId: string): Promise<LinkQRResponse>;

  //   Handle response when QR is scanned
  handleLinkCallback(payload: any): Promise<LinkedAccountData>;

  //   Generate QR for customers to pay
  generatePaymentQR(orderId: string): Promise<PaymentQRResponse>;

  //   Verify if payment was actually made
  verifyPayment(tranId: string): Promise<boolean>;

  //   Unlink or Disconnect the provider account from user account
  unlinkAccount(userId: string): Promise<boolean>;

  //   Refresh expired tokens
  renewToken(userId: string): Promise<boolean>;
}

export interface LinkQRResponse {
  qr_image: string;
  qr_string: string;
  deeplink?: string;
  expire_in: number;
}

export interface LinkedAccountData {
  // Consumer Token ID (unique ID for this link)
  ctid: string;
  //   Payway Token (password-like secret)
  pwt: string;
  //   Masked account number eg. "*****1234"
  mask_account: string;

  expired_in: number;
}

export interface PaymentQRResponse {
  qrImage: string;
  qrString: string;
  deeplink?: string;
  amount: number;
  currency: string;
}
