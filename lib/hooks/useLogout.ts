import { useState } from "react";
import { signOut } from "next-auth/react";

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };

  return { isLoading, handleLogout };
}
