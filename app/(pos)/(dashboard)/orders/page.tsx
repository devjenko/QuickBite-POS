import Section from "@/components/shared/Section";
import Tabs from "@/components/checkout/Tabs";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import OrderList from "@/components/orders/OrderList";
import OrdersPageWrapper from "@/components/orders/OrdersPageWrapper";

const OrdersPage = async () => {
  const session = await auth();

  const pendingOrders = await prisma.order.findMany({
    where: {
      merchantId: session?.user?.id,
      paymentStatus: "pending",
    },
    include: {
      items: {
        select: {
          id: true,
          name: true,
          price: true,
          quantity: true,
        },
      },
      _count: {
        select: { items: true },
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const completedOrders = await prisma.order.findMany({
    where: {
      merchantId: session?.user?.id,
      paymentStatus: "completed",
    },
    include: {
      items: {
        select: {
          id: true,
          name: true,
          price: true,
          quantity: true,
        },
      },
      _count: {
        select: { items: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <OrdersPageWrapper pollInterval={5000}>
      <Tabs
        tabs={[
          {
            label: "Pending",
            content: (
              <Section className="w-full flex flex-col gap-2.5">
                <OrderList orders={pendingOrders} />
              </Section>
            ),
          },
          {
            label: "Completed",
            content: (
              <Section className="w-full flex flex-col gap-2.5">
                <OrderList orders={completedOrders} />
              </Section>
            ),
          },
        ]}
      />
    </OrdersPageWrapper>
  );
};

export default OrdersPage;
