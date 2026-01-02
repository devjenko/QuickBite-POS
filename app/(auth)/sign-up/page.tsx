import Image from "next/image";
import logo from "@/public/quickbite-icon.svg";
import { SignUpForm } from "@/components/auth/SignupForm";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-8 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-4 font-medium">
            <Image
              src={logo}
              height={50}
              width={50}
              className="rounded-sm"
              alt="QuickBite logo"
            />
            <span className="text-xl">QuickBite</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/login.webp"
          alt="Login background"
          fill
          sizes="50vw"
          className="object-cover object-right"
          quality={85}
          priority
        />
      </div>
    </div>
  );
}
