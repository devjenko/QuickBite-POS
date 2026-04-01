"use client";

import React, { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";

interface KHQRCheckoutProps {
  amount: number;
  orderId: string;
  merchantName: string;
  bakongAccountId: string;
  onPaymentSuccess: (orderId: string) => void;
  onClose: () => void;
}

type PaymentState = "loading" | "displaying" | "verifying" | "success" | "expired" | "error";

export const KHQRCheckout: React.FC<KHQRCheckoutProps> = ({
  amount,
  orderId,
  merchantName,
  bakongAccountId,
  onPaymentSuccess,
  onClose,
}) => {
  const [state, setState] = useState<PaymentState>("loading");
  const [qrData, setQrData] = useState<string>("");
  const [md5, setMd5] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 minutes in seconds
  const [error, setError] = useState<string>("");

  const pollIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const timerIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate QR code
  const generateQR = async () => {
    try {
      setState("loading");
      setError("");

      // Create a new AbortController for this request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const response = await fetch("/api/khqr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          orderId,
          merchantName,
          bakongAccountId,
        }),
        signal: abortController.signal,
      });

      console.log("[KHQRCheckout] Generate response status:", response.status);

      if (!response.ok) {
        let errorMessage = "Failed to generate QR code";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseErr) {
          console.error("[KHQRCheckout] Failed to parse error response:", parseErr);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("[KHQRCheckout] Generated QR successfully");

      if (!data.qr || !data.md5) {
        throw new Error("Invalid QR response: missing qr or md5");
      }

      setQrData(data.qr);
      setMd5(data.md5);
      setTimeRemaining(600); // Reset timer to 10 minutes
      setState("displaying");
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("[KHQRCheckout] Error generating QR:", err.message);
        setError(err.message);
        setState("error");
      }
    }
  };

  // Verify payment status
  const verifyPayment = async (currentMd5: string) => {
    try {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const response = await fetch("/api/khqr/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ md5: currentMd5 }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to verify payment");
      }

      const data = await response.json();
      return data.paid;
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Verification error:", err);
      }
      return false;
    }
  };

  // Initial QR generation on mount
  useEffect(() => {
    // Validate props before generating
    if (!amount || !orderId || !merchantName || !bakongAccountId) {
      const missing = [];
      if (!amount) missing.push("amount");
      if (!orderId) missing.push("orderId");
      if (!merchantName) missing.push("merchantName");
      if (!bakongAccountId) missing.push("bakongAccountId");

      console.error("[KHQRCheckout] Missing required props:", missing);
      setError(`Missing required fields: ${missing.join(", ")}`);
      setState("error");
      return;
    }

    generateQR();

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [amount, orderId, merchantName, bakongAccountId]);

  // Start polling and timer once QR is displayed
  useEffect(() => {
    if (state !== "displaying" || !md5) return;

    // Start countdown timer
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setState("expired");
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Start payment verification polling
    pollIntervalRef.current = setInterval(async () => {
      const isPaid = await verifyPayment(md5);
      if (isPaid) {
        setState("success");
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        // Call success callback after showing success state briefly
        setTimeout(() => {
          onPaymentSuccess(orderId);
        }, 1500);
      }
    }, 3000); // Poll every 3 seconds

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [state, md5, orderId, onPaymentSuccess]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg max-w-md mx-auto">
      {/* Header */}
      <div className="w-full text-center">
        <h2 className="text-2xl font-semibold text-[var(--Black)] mb-2">Bakong KHQR</h2>
        <p className="text-sm text-[var(--Grey)]">Scan with any Cambodian bank app</p>
      </div>

      {/* Amount Display */}
      <div className="text-center">
        <p className="text-sm text-[var(--Grey)] mb-2">Amount</p>
        <p className="text-3xl font-bold text-[var(--Black)]">${amount.toFixed(2)}</p>
      </div>

      {/* QR Code or Status */}
      <div className="w-full flex justify-center min-h-[280px] items-center">
        {state === "loading" && (
          <div className="flex flex-col items-center gap-3">
            <Spinner className="size-8 text-[var(--Grey)]" />
            <p className="text-sm text-[var(--Grey)]">Generating QR Code...</p>
          </div>
        )}

        {state === "displaying" && qrData && (
          <div className="flex flex-col items-center gap-4">
            <QRCodeSVG
              value={qrData}
              size={256}
              level="H"
              fgColor="#000000"
              bgColor="#ffffff"
            />
            {/* Timer */}
            <div className="text-center">
              <p className="text-xs text-[var(--Grey)] mb-1">Expires in</p>
              <p className="text-2xl font-bold text-[var(--Black)] font-mono">
                {formatTime(timeRemaining)}
              </p>
            </div>
          </div>
        )}

        {state === "verifying" && (
          <div className="flex flex-col items-center gap-3">
            <Spinner className="size-8 text-[var(--Grey)]" />
            <p className="text-sm text-[var(--Grey)]">Verifying payment...</p>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-green-600">Payment Confirmed</p>
            <p className="text-sm text-[var(--Grey)]">Your payment has been received</p>
          </div>
        )}

        {state === "expired" && (
          <div className="flex flex-col items-center gap-3 text-center w-full">
            <div className="text-4xl">⏰</div>
            <p className="text-lg font-semibold text-[var(--Black)]">QR Code Expired</p>
            <p className="text-sm text-[var(--Grey)] mb-4">
              The QR code has expired. Tap below to generate a new one.
            </p>
            <Button
              onClick={generateQR}
              variant="dark"
              className="w-full"
            >
              Generate New QR
            </Button>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center gap-3 text-center w-full">
            <div className="text-4xl">❌</div>
            <p className="text-lg font-semibold text-red-600">Error</p>
            <p className="text-sm text-[var(--Grey)] mb-4">{error}</p>
            <Button
              onClick={generateQR}
              variant="dark"
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* Info text */}
      <div className="w-full text-center text-xs text-[var(--Grey)]">
        <p>Accepts all Cambodian bank apps</p>
        <p className="text-[var(--Grey)] text-opacity-70">ABA, ACLEDA, Wing, and more</p>
      </div>

      {/* Close button (only shown for non-success states) */}
      {state !== "success" && (
        <button
          onClick={onClose}
          className="text-sm text-[var(--Grey)] hover:text-[var(--Black)] transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default KHQRCheckout;
