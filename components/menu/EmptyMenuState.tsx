import { UtensilsCrossed } from "lucide-react";

const EmptyMenuState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="bg-[var(--LightGrey)] rounded-full p-8 mb-4">
        <UtensilsCrossed className="w-32 h-32 text-[var(--Grey)]" />
      </div>
      <h3 className="text-large font-semibold text-[var(--Black)] mb-2">
        Your Menu is Empty
      </h3>
      <p className="text-xsmall text-[var(--Grey)] max-w-xs">
        Click &quot;+&quot; to start adding some delicious items
      </p>
    </div>
  );
};

export default EmptyMenuState;
