"use client";

import { useCartStore } from "@/store/cart-store";
import Button from "@/components/ui/Button";
import { MinusIcon, PlusIcon } from "lucide-react";

const Counter = ({ id }: { id: string }) => {
  const quantity = useCartStore(
    (state) => state.items.find((i) => i.id === id)?.quantity ?? 0
  );

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <div className="flex gap-4 justify-center items-center w-full">
      <Button
        onClick={() => increaseQuantity(id)}
        variant={"dark"}
        className="rounded-full w-7.5 h-7.5 "
      >
        <PlusIcon />
      </Button>
      <span>{quantity}</span>
      <Button
        onClick={() => decreaseQuantity(id)}
        variant={"dark"}
        className="rounded-full w-7.5 h-7.5 "
      >
        <MinusIcon />
      </Button>
    </div>
  );
};

export default Counter;
