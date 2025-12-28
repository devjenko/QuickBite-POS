import Link from "next/link";
import Image from "next/image";

const BackButton = ({ href }: { href: string }) => {
  return (
    <Link className="flex gap-2.5" href={href}>
      <Image
        width={24}
        height={24}
        alt="left arrow icon"
        src={"/icons/arrow-left.svg"}
      />

      <span>Back</span>
    </Link>
  );
};

export default BackButton;
