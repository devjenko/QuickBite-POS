"use client";
import Image from "next/image";
import logo from "@/public/quickbite-icon.svg";
import { LoginForm } from "@/components/auth/login-form";
import { useState } from "react";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const toggleAuthenticated = () => setIsAuthenticated(!isAuthenticated);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-4 font-medium">
            <Image
              src={logo}
              height={50}
              width={50}
              className="rounded-sm"
              alt="QuickBite logo"
            />
            QuickBite
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            {isAuthenticated ? (
              <LoginForm onAuthenticated={toggleAuthenticated} />
            ) : (
              <SignUpForm onAuthenticated={toggleAuthenticated}  />
            )}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/login1.webp"
          alt="Login background"
          fill
          className="object-cover absolute inset-0 h-full w-full  dark:brightness-[0.2] dark:grayscale "
        />
      </div>
    </div>
  );
}
