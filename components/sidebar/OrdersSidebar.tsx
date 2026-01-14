import BaseSidebar from "./BaseSidebar"
import { useOrderStore } from "@/store/order-store";
import ContentWrapper from "../shared/ContentWrapper";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { completeOrder } from "@/app/actions/order";
import { useState } from "react";
import { OrderProps } from "@/types/order";
import Spinner from "../ui/Spinner";


const OrdersSidebar = () => {
    const { selectedOrder, setSelectedOrder } = useOrderStore();
    const [isLoading, setIsLoading] = useState(false);


    const handleComplete =  async () => {
        if (!selectedOrder) return;
        try {
            await completeOrder(selectedOrder.id);
            toast.success("Order completed");
            setSelectedOrder(null as unknown as OrderProps);
        } catch (error) {
            toast.error("Failed to complete order");
        } finally {
            setIsLoading(false);
        }
    }

    return (
    <BaseSidebar style={{ right: "max(0px, calc((100vw - 3000px) / 2))" }}
    className="top-0 bg-[var(--White)]  w-xs ">
      <ul className="flex flex-col gap-5 overflow-y-auto h-full hide-scrollbar">
      {selectedOrder && (
        <div className="flex flex-col gap-4 flex-1">
          <h2 className="font-bold">
            Order <span className="font-normal">#{selectedOrder.orderNumber}</span>
          </h2>
          
          {/* Header row */}
          <div className="flex justify-between px-4">
            <span className="font-semibold">Item</span>
            <span className="font-semibold">Qty</span>
          </div>
          
          {/* Items list */}
          <div className="flex flex-col gap-2.5 flex-1">
            {selectedOrder.items.map((item) => (
              <ContentWrapper className="flex justify-between px-4 py-3 rounded-none" key={item.id}>
                <span>{item.name}</span>
                <span>{item.quantity}</span>
              </ContentWrapper>
            ))}
          </div>
          {selectedOrder.paymentStatus === "pending" ? (
            <Button onClick={handleComplete} variant={"dark"} className="w-full justify-between">
              {isLoading ? <Spinner /> : <>Complete <ArrowRight /></>}
            </Button>
          ) : (
            <Button variant={"dark"} className="w-full justify-center cursor-default">
              Total: ${selectedOrder.total.toFixed(2)}
            </Button>
          )}
        </div>
      )}
      </ul>
    </BaseSidebar>
  )
}

export default OrdersSidebar