

import Section from "@/components/shared/Section";
import Tabs from "@/components/checkout/Tabs";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import OrderList from "@/components/orders/OrderList";



const OrdersPage = async () => {
  const session = await auth();

  const pendingOrders = await prisma.order.findMany({
    where: {
      merchantId: session?.user?.id,
      paymentStatus: "pending",
    },
    include: {
      _count: {
        select: { items: true },
      },
    },
  });

  const completedOrders = await prisma.order.findMany({
    where: {
      merchantId: session?.user?.id,
      paymentStatus: "paid",
    },
    include: {
      _count: {
        select: { items: true },
      },
    },
  });

  

  return (
    <Tabs
      tabs={[
        {
          label: "Pending",
          content: (
            <Section className="w-full flex flex-col gap-2.5">
              <OrderList
                orders={pendingOrders}
              />
            </Section>
          ),
        },
        {
          label: "Completed",
          content: (
            <Section className="w-full flex flex-col gap-2.5">
              <OrderList
                orders={completedOrders}
              />
            </Section>
          ),
        },
      ]}
    />
  );
};

export default OrdersPage;
