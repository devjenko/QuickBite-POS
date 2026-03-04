"use client";

import { useState } from "react";
import CheckoutButton from "./CheckoutButton";
import { useRouter } from "next/navigation";

const CheckoutButtonWrapper = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push("/checkout");
  };
  return (
    <CheckoutButton
      className="w-full  max-w-[90%] fixed bottom-1 left-1/2 -translate-x-1/2 xl:hidden"
      onClick={handleClick}
      isLoading={isLoading}
    />
  );
};

export default CheckoutButtonWrapper;
