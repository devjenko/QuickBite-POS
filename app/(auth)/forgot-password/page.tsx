import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md shadow-sm  w-full text-center border">
        <h1 className="text-2xl">Need to reset your password?</h1>
        <div className="flex justify-between items-center mb-4"></div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Scan this QR code to contact support via Telegram:
        </p>

        <div className="flex justify-center mb-4">
          <Image
            alt="Support telegram QR code"
            src={
              "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://t.me/JENKOZA"
            }
            width={200}
            height={200}
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Or contact directly at:
          </p>

          <Link
            href="mailto:support@quickbite.com?subject=Password Reset Request"
            className="text-[var(--DarkBlue)]  font-bold"
          >
            support@quickbite.com
          </Link>
        </div>
        <Link href={"/login"}>
          <Button variant="dark" className="mt-6">
            Back to login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
