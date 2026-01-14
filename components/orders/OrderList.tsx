"use client";

import { useState } from "react";
import Order from "./Order";
import { OrderProps } from "@/types/order";

const OrderList = ({ orders }: { orders: OrderProps[] }) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  return (
    <ul className="flex flex-col gap-2.5">
      {orders.map((order) => (
        <Order
          key={order.id}
          id={order.id}
          orderNumber={order.orderNumber}
          createdAt={order.createdAt}
          _count={order._count}
          total={order.total}
          isSelected={selectedOrderId === order.id}
          onSelect={() => handleOrderSelect(order.id)}
        />
      ))}
    </ul>
  );
};

export default OrderList;