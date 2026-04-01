"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Spinner from "@/components/ui/Spinner";
import ProviderButton from "./ProviderButton";
import BaseModal from "../shared/BaseModal";
import { Button } from "../ui/Button";
import { toast } from "sonner";
import { useCartTotal } from "@/store/cart-store";
import { useCartStore } from "@/store/cart-store";
import { useBankQRCodes, BankQRCode } from "@/lib/hooks/useBankQRCodes";
import KHQRCheckout from "./KHQRCheckout";

interface OrderData {
  id: string;
  merchantName: string;
}

interface QRDisplayProps {
  onBakongPaymentSuccess?: (orderId: string) => void;
}

const QRDisplay: React.FC<QRDisplayProps> = ({ onBakongPaymentSuccess }) => {
  const { qrCodes, isLoading, error, refresh } = useBankQRCodes();

  const [selectedQR, setSelectedQR] = useState<BankQRCode | null>(null);
  const [showKHQR, setShowKHQR] = useState<boolean>(false);
  const [bakongAccountId, setBakongAccountId] = useState<string | null>(null);
  const [bakongEnabled, setBakongEnabled] = useState<boolean>(true);
  const [merchantName, setMerchantName] = useState<string>("QuickBite");
  const [orderId, setOrderId] = useState<string>("");
  const [isFetchingBakong, setIsFetchingBakong] = useState<boolean>(true);

  const totalPrice = useCartTotal();

  // Load Bakong account ID and merchant info on mount
  useEffect(() => {
    const loadBakongSettings = async () => {
      try {
        // Get Bakong account ID
        const accountResponse = await fetch("/api/khqr/settings");
        if (accountResponse.ok) {
          try {
            const accountData = await accountResponse.json();
            setBakongAccountId(accountData.bakongAccountId || null);
          } catch (parseErr) {
            console.debug("Failed to parse Bakong account response:", parseErr);
          }
        } else if (accountResponse.status !== 401) {
          // Log non-401 errors for debugging
          console.debug("Failed to fetch Bakong account ID:", accountResponse.status);
        }

        // Get merchant settings for name and bakong toggle
        const settingsResponse = await fetch("/api/settings");
        if (settingsResponse.ok) {
          try {
            const settingsData = await settingsResponse.json();
            setBakongEnabled(settingsData.bakongPayments !== false);
          } catch (parseErr) {
            console.debug("Failed to parse settings response:", parseErr);
          }
        }

        // Generate a temporary order ID for the QR
        setOrderId(`ORDER-${Date.now()}`);
      } catch (err) {
        console.debug("Error loading Bakong settings:", err);
      } finally {
        setIsFetchingBakong(false);
      }
    };

    void loadBakongSettings();
  }, []);

  const handleProviderBtnClick = useCallback((qr: BankQRCode) => {
    setSelectedQR(qr);
  }, []);

  const handleCloseModal = () => {
    setSelectedQR(null);
  };

  const handleKHQRClick = async () => {
    try {
      console.log("[QRDisplay] Bakong button clicked");

      // Get tax rate from settings
      const settingsResponse = await fetch("/api/settings");
      const settingsData = await settingsResponse.json();
      const taxRate = settingsData.defaultTaxRate || 0;

      // Create order for Bakong payment
      const items = useCartStore.getState().items;
      if (items.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      console.log("[QRDisplay] Creating order with items:", items.length);

      const orderItems = items.map((item) => ({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
      }));

      const tax = totalPrice * (taxRate / 100);
      const total = totalPrice + tax;

      const formData = new FormData();
      const fields: Record<string, string> = {
        items: JSON.stringify(orderItems),
        subtotal: totalPrice.toString(),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        currency: "USD",
        paymentStatus: "pending",
        category: items[0].category,
      };

      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

      // Import createOrder from actions
      const { createOrder } = await import("@/app/actions/order");
      const result = await createOrder(formData);

      console.log("[QRDisplay] Order created with ID:", result?.id);

      // Get the order ID from the result
      if (result && result.id) {
        console.log("[QRDisplay] Setting orderId to:", result.id);
        setOrderId(result.id);
        setShowKHQR(true);
      } else {
        console.error("[QRDisplay] No order ID returned from createOrder");
        toast.error("Failed to create order");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to prepare Bakong payment";
      console.error("[QRDisplay] Error:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCloseKHQR = () => {
    setShowKHQR(false);
  };

  const handleKHQRPaymentSuccess = (confirmedOrderId: string) => {
    // The payment has been confirmed
    handleCloseKHQR();
    // Call parent callback to mark order as paid and redirect
    if (onBakongPaymentSuccess) {
      onBakongPaymentSuccess(confirmedOrderId);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="text-red-500 mb-2 text-base">Error loading providers</div>
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
      <div className="flex items-center justify-center  m-auto h-full">
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
        <div className="text-[var(--Grey)] mb-2 text-base">No QR codes uploaded yet</div>
        <div className="text-xxxsmall text-[var(--Grey)]">
          Upload bank QR codes in Settings to accept payments
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-wrap gap-4 w-full justify-center">
        {/* Bakong KHQR Button */}
        {!isFetchingBakong && bakongEnabled && bakongAccountId && (
          <ProviderButton
            title="Bakong KHQR"
            image="/logos/bakong_bank_logo.webp"
            onClick={handleKHQRClick}
          />
        )}

        {/* Bank QR Buttons */}
        {qrCodes.map((qr) => (
          <ProviderButton
            key={qr.bankName}
            title={qr.bankName}
            image={`/logos/${qr.bankName.split(" ").reverse().pop()?.toLowerCase()}_bank_logo.webp`}
            onClick={() => handleProviderBtnClick(qr)}
          />
        ))}

        {/* Bank QR Modal */}
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

        {/* Bakong KHQR Modal */}
        <BaseModal isOpen={showKHQR} setIsOpen={handleCloseKHQR}>
          {bakongAccountId ? (
            <>
              <KHQRCheckout
                amount={totalPrice}
                orderId={orderId}
                merchantName={merchantName}
                bakongAccountId={bakongAccountId}
                onPaymentSuccess={handleKHQRPaymentSuccess}
                onClose={handleCloseKHQR}
              />
            </>
          ) : (
            <div className="text-center text-red-500">
              No Bakong account configured. Please set up your Bakong account in Settings.
            </div>
          )}
        </BaseModal>
      </div>
    </div>
  );
};

export default QRDisplay;
