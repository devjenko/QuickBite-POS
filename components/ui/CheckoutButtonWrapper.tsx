"use client";

import { useState } from "react";
import CheckoutButton from "./CheckoutButton";
import { useRouter } from "next/navigation";

const CheckoutButtonWrapper = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    await router.push("/checkout");
  };
  return (
    <CheckoutButton
      className="w-full fixed bottom-1 max-w-[400px] xl:hidden left-1/2 -translate-x-1/2"
      onClick={handleClick}
      isLoading={isLoading}
    />
  );
};

export default CheckoutButtonWrapper;
