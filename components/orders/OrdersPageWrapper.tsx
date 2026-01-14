"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface OrdersPageWrapperProps {
  children: React.ReactNode;
  pollInterval?: number; // in milliseconds
}

const OrdersPageWrapper = ({
  children,
  pollInterval = 5000, // Default: refresh every 5 seconds
}: OrdersPageWrapperProps) => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [router, pollInterval]);

  return <>{children}</>;
};

export default OrdersPageWrapper;
