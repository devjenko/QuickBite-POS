"use client";

import Order from "./Order";
import { OrderProps } from "@/types/order";
import { useOrderStore } from "@/store/order-store";

const OrderList = ({ orders }: { orders: OrderProps[] }) => {
  const { selectedOrder, setSelectedOrder } = useOrderStore();

  const handleOrderSelect = (order: OrderProps) => {
    setSelectedOrder(order);
  };


  return (
    <ul className="flex flex-col gap-2.5">
      {orders.map((order) => (
        <Order
          key={order.id}
          id={order.id}
          orderNumber={order.orderNumber}
          createdAt={order.createdAt}
          items={order.items}
          paymentStatus={order.paymentStatus}
          _count={order._count}
          total={order.total}
          isSelected={selectedOrder?.id === order.id}
          onSelect={() => handleOrderSelect(order)}
        />
      ))}
    </ul>
  );
};

export default OrderList;