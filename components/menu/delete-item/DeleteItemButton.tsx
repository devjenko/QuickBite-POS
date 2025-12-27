import { Button } from "@/components/ui/Button";
import { Trash2Icon } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

export interface DeleteItemButtonProps {
  ItemId?: string;
  ItemName?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDeleting: boolean;
}

const DeleteItemButton = ({ onClick, isDeleting }: DeleteItemButtonProps) => {
  return (
    <Button
      variant={"default"}
      onClick={onClick}
      className={"w-fit absolute right-0 rounded-sm rounded-r-none shadow-sm"}
    >
      {!isDeleting ? <Trash2Icon /> : <Spinner color="black" />}
    </Button>
  );
};

export default DeleteItemButton;
