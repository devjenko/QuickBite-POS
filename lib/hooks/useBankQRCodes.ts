import useSWR from "swr";

export interface BankQRCode {
  id: string;
  bankName: string;
  imageUrl: string;
}

interface BankQRResponse {
  qrCodes: BankQRCode[];
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch QR codes");
    return res.json();
  });

export function useBankQRCodes() {
  const { data, error, isLoading, mutate } = useSWR<BankQRResponse>(
    "/api/bank-qr",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    qrCodes: data?.qrCodes ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}