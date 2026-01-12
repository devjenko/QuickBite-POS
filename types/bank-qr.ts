export interface BankQRCode {
  id: string;
  bankName: string;
  imageUrl: string;
}

export interface BankQRResponse {
  qrCodes: BankQRCode[];
}
