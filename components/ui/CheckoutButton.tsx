import Link from "next/link";
import Button from "./Button";
import { useCartStore } from "@/store/cart-store";

const CheckoutButton = () => {
  const totalPrice = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  return (
    <Link href={"/checkout"}>
      {" "}
      <Button variant={"dark"}>${totalPrice.toFixed(2)}</Button>
    </Link>
  );
};

export default CheckoutButton;
