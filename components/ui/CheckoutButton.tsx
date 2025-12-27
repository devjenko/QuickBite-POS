import Link from "next/link";
import Button from "./Button";
import { useCartStore } from "@/store/cart-store";
import { ArrowRight } from "lucide-react";

const CheckoutButton = () => {
  const totalPrice = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  return (
    <Link href={"/checkout"}>
      {" "}
      <Button
        className="w-2xs justify-between fixed bottom-4 p-3"
        variant={"dark"}
      >
        ${totalPrice.toFixed(2)}
        <span className="flex justify-center items-center gap-2">
          Pay <ArrowRight />
        </span>
      </Button>
    </Link>
  );
};

export default CheckoutButton;
