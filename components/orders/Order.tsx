import ContentWrapper from "../shared/ContentWrapper";
import { cn } from "@/lib/utils";
import { OrderProps } from "@/types/order";


const Order = ({
  orderNumber,
  createdAt,
  _count: { items },
  total,
  isSelected = false,
  onSelect,
}: OrderProps) => {


  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <ContentWrapper variant={isSelected ? "dark" : "light"} className={cn("py-6 px-4 flex  justify-between rounded-none cursor-pointer")} onClick={onSelect}>
      {/* Left section - Order info */}
      <div className="flex flex-col gap-8">
        <h3 className="text-small font-semibold  flex-1 leading-tight">
          Order #{orderNumber}
        </h3>
      {/* Items count */}
        <span className="text-xsmall ">
          {items} {items === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Right section  */}
      <div className="flex flex-col gap-8">
       {/* Time */}
        <p className="text-xsmall leading-tight text-right text-inherit">
          {formatTime(createdAt)}
        </p>

        <div className="flex gap-3 items-center">
         
         {/* Price */}
          <span className="text-small font-semibold  min-w-[70px] ">
            {formatPrice(total)}
          </span>

          {/* Paid tag */}
            <span className="text-small font-medium text-[var(--White)] bg-[var(--Green)] rounded-full px-7 py-1">
              Paid
            </span>
          
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Order;
