"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";

interface BankQRCode {
  id: string;
  bankName: string;
  imageUrl: string;
}

const QRDisplay = () => {
  const [qrCodes, setQrCodes] = useState<BankQRCode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const fetchQRCodes = async () => {
    try {
      const response = await fetch("/api/bank-qr");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setQrCodes(data.qrCodes || []);
    } catch (error) {
      console.error("Error fetching QR codes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="size-6 text-[var(--Grey)]" />
          <div className="text-[var(--Grey)]">Loading QR codes...</div>
        </div>
      </div>
    );
  }

  if (qrCodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center px-4">
        <div className="text-[var(--Grey)] mb-2 text-base">
          No QR codes uploaded yet
        </div>
        <div className="text-xxxsmall text-[var(--Grey)]">
          Upload bank QR codes in Settings to accept payments
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-large font-semibold text-[var(--Black)] mb-2">
        Scan to Pay
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {qrCodes.map((qr) => (
          <Card key={qr.id} className="overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center">
              <CardTitle className="text-base font-semibold text-[var(--Black)] mb-4">
                {qr.bankName}
              </CardTitle>
              <div className="relative w-full max-w-[300px] aspect-square bg-[var(--LightGrey)] rounded-lg overflow-hidden">
                <Image
                  src={qr.imageUrl}
                  alt={`${qr.bankName} QR Code`}
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QRDisplay;
