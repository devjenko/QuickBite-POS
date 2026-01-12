"use client";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/Button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

const Counter = ({ id }: { id: string }) => {
  const { quantity, increaseQuantity, decreaseQuantity } = useCartStore(
    useShallow((state) => ({
      quantity: state.items.find((i) => i.id === id)?.quantity ?? 0,
      increaseQuantity: state.increaseQuantity,
      decreaseQuantity: state.decreaseQuantity,
    }))
  );

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
