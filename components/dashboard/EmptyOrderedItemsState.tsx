import { ReceiptText } from "lucide-react";

const EmptyOrderedItemsState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className=" p-6 mb-4">
        <ReceiptText className="w-12 h-12 text-[var(--Grey)]" />
      </div>
      <h3 className="text-large font-semibold text-[var(--Black)] mb-2">
        No Orders Yet
      </h3>
      <p className="text-xsmall text-[var(--Grey)] max-w-xs">
        Completed orders will show item statistics here
      </p>
    </div>
  );
};

export default EmptyOrderedItemsState;
