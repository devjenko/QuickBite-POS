
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useCartTotal } from "@/store/cart-store";
import Spinner from "./Spinner";


const CheckoutButton = ({
  isLoading,
  className,
  onClick,
}: {

  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const totalPrice = useCartTotal();

  return (
    <Button onClick={onClick} className={`${className}  justify-between p-3`} variant={"dark"}>
      {isLoading ? <Spinner className="m-auto" /> : (
        <>
          ${totalPrice.toFixed(2)}
          <span className="flex justify-center items-center gap-2">
            Pay <ArrowRight />
          </span>
        </>
      )}
    </Button>
  );
};

export default CheckoutButton;
