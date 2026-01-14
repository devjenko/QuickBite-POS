import { OrderProps } from "@/types/order";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface OrderState {
    selectedOrder: OrderProps | null;
    setSelectedOrder: (order: OrderProps) => void;
    clearSelectedOrder: () => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            selectedOrder: null,
            setSelectedOrder: (order) => set({ selectedOrder: order }),
            clearSelectedOrder: () => set({ selectedOrder: null }),
        }),
        {
            name: "order-storage",
        }
    )
)