import Section from "@/components/shared/Section";
import Tabs from "@/components/checkout/Tabs";

const OrdersPage = () => {
  return (
   <Section >
    <Tabs tabs={[
      { label: "Pending", content: <div>Active</div> },
      { label: "Completed", content: <div>Completed</div> },
    ]} />
   </Section>
  );
};

export default OrdersPage;
