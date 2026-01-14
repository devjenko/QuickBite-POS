import { Clock, CheckCircle } from "lucide-react";

interface EmptyOrdersStateProps {
  type: "pending" | "completed";
}

const EmptyOrdersState = ({ type }: EmptyOrdersStateProps) => {
  const isPending = type === "pending";
  
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="bg-[var(--LightGrey)] rounded-full p-6 mb-4">
        {isPending ? (
          <Clock className="w-12 h-12 text-[var(--Grey)]" />
        ) : (
          <CheckCircle className="w-12 h-12 text-[var(--Grey)]" />
        )}
      </div>
      <h3 className="text-large font-semibold text-[var(--Black)] mb-2">
        {isPending ? "No Pending Orders" : "No Completed Orders"}
      </h3>
      <p className="text-xsmall text-[var(--Grey)] max-w-xs">
        {isPending
          ? "Incoming orders will appear here"
          : "Orders move here after completion"}
      </p>
    </div>
  );
};

export default EmptyOrdersState;
