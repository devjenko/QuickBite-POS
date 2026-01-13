"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Spinner from "@/components/ui/Spinner";
import ProviderButton from "./ProviderButton";
import BaseModal from "../shared/BaseModal";
import { Button } from "../ui/Button";
import { useCartTotal } from "@/store/cart-store";
import { useBankQRCodes, BankQRCode } from "@/lib/hooks/useBankQRCodes";

const QRDisplay = () => {
  const { qrCodes, isLoading, error, refresh } = useBankQRCodes();
  const [selectedQR, setSelectedQR] = useState<BankQRCode | null>(null);

  const totalPrice = useCartTotal();

  const handleProviderBtnClick = useCallback((qr: BankQRCode) => {
    setSelectedQR(qr);
  }, []);

  const handleCloseModal = () => {
    setSelectedQR(null);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="text-red-500 mb-2 text-base">
          Error loading providers
        </div>
        <div className="text-sm text-[var(--Grey)]">
          {error instanceof Error ? error.message : "Failed to fetch QR codes"}
        </div>
        <Button onClick={() => refresh()} variant="dark" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center  m-auto h-full">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="size-6 text-[var(--Grey)]" />
          <div className="text-[var(--Grey)]">Loading Providers</div>
        </div>
      </div>
    );
  }

  if (qrCodes.length === 0) {
    return (
      <div className="flex flex-col  text-center w-full justify-center h-full items-center px-4">
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
    <div className="flex flex-col w-full gap-8">
      <h2 className="text-large  font-semibold text-center text-[var(--Black)] mb-2">
        Providers
      </h2>
      <div className="flex flex-wrap gap-4 w-full ">
        {qrCodes.map((qr) => (
          <ProviderButton
            key={qr.bankName}
            title={qr.bankName}
            image={`/logos/${qr.bankName.split(" ").reverse().pop()?.toLowerCase()}_bank_logo.webp`}
            onClick={() => handleProviderBtnClick(qr)}
          />
        ))}

        <BaseModal isOpen={!!selectedQR} setIsOpen={handleCloseModal}>
          <div className="text-3xl flex flex-col gap-8 font-semibold text-center text-[var(--Black)] mb-2">
            <h2 className="text-3xl">Scan to Pay</h2>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          {selectedQR && (
            <Image
              src={selectedQR.imageUrl}
              width={500}
              height={500}
              alt={`${selectedQR.bankName} QR code`}
              unoptimized
            />
          )}
        </BaseModal>

      
      </div>
    </div>
  );
};

export default QRDisplay;
