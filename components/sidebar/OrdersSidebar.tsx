import BaseSidebar from "./BaseSidebar"
import { useOrderStore } from "@/store/order-store";
import ContentWrapper from "../shared/ContentWrapper";
import { Button } from "../ui/Button";
import { ArrowRight, ClipboardList } from "lucide-react";
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
      <div className="flex flex-col gap-5 overflow-y-auto h-full hide-scrollbar">
      {!selectedOrder && (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="rounded-full p-6 mb-4">
            <ClipboardList className="w-12 h-12 text-[var(--Grey)]" />
          </div>
          <h3 className="text-large font-semibold text-[var(--Black)] mb-2">No Order Selected</h3>
          <p className="text-xsmall text-[var(--Grey)]">
            Select an order from the list to view its details
          </p>
        </div>
      )}
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
      </div>
    </BaseSidebar>
  )
}

export default OrdersSidebar