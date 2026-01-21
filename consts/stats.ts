import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const getStats = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const [revenueResult, ordersCount, itemsCount] = await Promise.all([
    prisma.order.aggregate({
      _sum: { subtotal: true },
      where: { merchantId: userId, paymentStatus: "completed" },
    }),
    prisma.order.count({
      where: { merchantId: userId },
    }),
    prisma.menuItem.count({
      where: { userId },
    }),
  ]);

  return {
    revenue: Number(revenueResult._sum.subtotal) || 0,
    orders: ordersCount,
    inventory: 0, //!TODO: Add inventory count to schema
    items: itemsCount,
  };
}


export const statCardContent = [	
  {
    icon: "/icons/dollar.svg",
    name: "Revenue",
    key: "revenue" as const,
  },
  {
    icon: "/icons/online.svg",
    name: "Orders",
    key: "orders" as const,
  },
  {
    icon: "/icons/inventory.svg",
    name: "Inventory",
    key: "inventory" as const,
  },

]