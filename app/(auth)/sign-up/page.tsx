import Image from "next/image";
import { SignUpForm } from "@/components/auth/SignupForm";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-8 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-4 font-medium">
            <Image
              src={"/quickbite-icon.webp"}
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
          src="https://res.cloudinary.com/dope0htm4/image/upload/f_auto,q_auto:good,w_1920/auth-cover_tdd9bn"
          alt="Login background"
          fill
          sizes="50vw"
          className="object-cover"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
