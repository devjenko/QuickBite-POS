declare module "bakong-khqr" {
  export const khqr: {
    currency: {
      usd: string;
      khr?: string;
      cny?: string;
      thb?: string;
      vnd?: string;
      myr?: string;
      sgd?: string;
    };
    generate: (options: {
      currency: string;
      amount: number;
      billNumber?: string;
      storeLabel?: string;
      terminalLabel?: string;
      merchantName?: string;
      accountId: string;
      expireDate?: Date;
    }) => {
      data: string;
      md5: string;
    };
  };
}
