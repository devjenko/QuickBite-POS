import { useCartStore } from "@/store/cart-store";
import CartItem from "@/components/shared/CartItem";

const OrderList = ({ className }: { className?: string }) => {
  const items = useCartStore((state) => state.items);

  return (
    <ul
      className={`${className}  p-2.5  gap-2.5 flex flex-col overflow-y-auto hide-scrollbar h-screen`}
    >
      {items.map((item) => (
        <li key={item.name}>
          <CartItem
            imageUrl={item.image}
            id={item.id}
            name={item.name}
            price={item.price}
          />
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
