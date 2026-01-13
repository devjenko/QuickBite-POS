import Section from "@/components/shared/Section";
import Tabs from "@/components/checkout/Tabs";
import {auth } from "@/auth";
import prisma from "@/lib/prisma";


const OrdersPage = async () => {

const session = await auth();

const pendingOrders = await prisma.order.findMany({
  where: {
    merchantId: session?.user?.id,
    paymentStatus: "pending",
  },
});

const completedOrders = await prisma.order.findMany({
  where: {
    merchantId: session?.user?.id,
    paymentStatus: "paid",
  },
});



  return (
<>
    <Tabs tabs={[
      { label: "Pending", content: <Section>{pendingOrders.map((order) => (
        <div key={order.id}>
          <h3>Order #{order.orderNumber}</h3>
          <p>${order.total}</p>
          <p>Paid</p>
        </div>
      ))}</Section>},
      { label: "Completed", content: <Section>{completedOrders.map((order) => (
        <div key={order.id}>
          <h3>Order #{order.orderNumber}</h3>
          <p>{order.total}</p>
          <p>paid</p>
        </div>
      ))}</Section> },
    ]} />

   
   </>
  );
};

export default OrdersPage;
