"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const BackButton = ({
  href,
  onClick,
}: {
  href?: string;
  onClick?: () => void;
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button onClick={handleClick} className="flex gap-2.5 cursor-pointer">
      <Image
        width={24}
        height={24}
        alt="left arrow icon"
        src={"/icons/arrow-left.svg"}
      />

      <span>Back</span>
    </button>
  );
};

export default BackButton;
