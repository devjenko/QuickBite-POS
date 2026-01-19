import Section from "@/components/shared/Section";
import Tabs from "@/components/checkout/Tabs";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import OrderList from "@/components/orders/OrderList";
import OrdersPageWrapper from "@/components/orders/OrdersPageWrapper";
import EmptyOrdersState from "@/components/orders/EmptyOrdersState";

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
      createdAt: "asc",
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
              <Section className={`w-full flex flex-col gap-2.5 !bg-[var(--LightGrey)] ${pendingOrders.length === 0 ? "h-full items-center justify-center" : ""}`}>
                {pendingOrders.length > 0 ? (
                  <OrderList orders={pendingOrders} />
                ) : (
                  <EmptyOrdersState type="pending" />
                )}
              </Section>
            ),
          },
          {
            label: "Completed",
            content: (
              <Section className={`w-full flex flex-col gap-2.5 !bg-[var(--LightGrey)] ${completedOrders.length === 0 ? "h-full items-center justify-center" : ""}`}>
                {completedOrders.length > 0 ? (
                  <OrderList orders={completedOrders} />
                ) : (
                  <EmptyOrdersState type="completed" />
                )}
              </Section>
            ),
          },
        ]}
      />
    </OrdersPageWrapper>
  );
};

export default OrdersPage;
