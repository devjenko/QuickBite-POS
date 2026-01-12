import Image from "next/image";
import Counter from "@/components/shared/Counter";
import { CircleXIcon } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "../ui/Button";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  className?: string;
  imageUrl?: string;
}

const CartItem = ({ name, price, className, imageUrl, id }: CartItemProps) => {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className={`${className} flex  w-full flex-col`}>
      <Image
        unoptimized
        width={40}
        height={40}
        alt="cart item image"
        src={imageUrl || ""}
        className="object-cover w-15 h-15 rounded-sm"
      />

      <p>{name}</p>
      <strong>{price}</strong>

      <div className="w-full flex ">
        <Counter id={id} />
        <Button onClick={() => removeItem(id)}>
          <CircleXIcon color="grey" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
