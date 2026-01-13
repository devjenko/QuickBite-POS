import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useCartTotal } from "@/store/cart-store";


const CheckoutButton = ({
  href,
  className,
  onClick,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
}) => {
  const totalPrice = useCartTotal();

  return (
    <Link onClick={onClick} href={href}>
      {" "}
      <Button className={`${className}  justify-between p-3`} variant={"dark"}>
        ${totalPrice.toFixed(2)}
        <span className="flex justify-center items-center gap-2">
          Pay <ArrowRight />
        </span>
      </Button>
    </Link>
  );
};

export default CheckoutButton;
