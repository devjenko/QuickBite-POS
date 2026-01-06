"use client";

import BaseModal from "@/components/shared/BaseModal";
import { BaseModalProps } from "@/components/shared/BaseModal";
import InputPassword from "@/components/auth/InputPassword";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SettingsModal = ({ isOpen, setIsOpen }: BaseModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();
  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter your password");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ password: input }),
      });

      const data = await response.json();

      //   if the response is not successful
      if (!response.ok) {
        toast.error(data.error || "Password verification failed ");
        return;
      }

      //   if password is verified successfully
      toast.success("Password verified!");
      setIsOpen(false);
      router.push("/settings");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setInput(""); // Clear password input
    }
  };

  return (
    <BaseModal
      btnName="Verify"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Password Verification"
      description="Verify account password to access settings"
      onSubmit={handleVerifyPassword}
      isLoading={isLoading}
    >
      <form onSubmit={handleVerifyPassword}>
        <InputPassword onChange={(e) => setInput(e.target.value)} />
      </form>
    </BaseModal>
  );
};

export default SettingsModal;
