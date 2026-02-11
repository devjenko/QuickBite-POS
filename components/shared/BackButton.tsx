import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const BackButton = ({ href = "", className }: { href?: string; className?: string }) => {
  return (
    <Link href={href} className={cn("flex gap-2.5 cursor-pointer", className)}>
      <Image width={24} height={24} alt="Go back to dashboard" src="/icons/arrow-left.svg" />
      <span>Back</span>
    </Link>
  );
};

export default BackButton;
