import Image from "next/image";
import logo from "@/assets/logos/quickbite-logo.svg";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
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
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/login1.jpg"
          alt="Login background"
          fill
          className="object-cover absolute inset-0 h-full w-full  dark:brightness-[0.2] dark:grayscale "
        />
      </div>
    </div>
  );
}
