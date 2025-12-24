import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { DeleteItemButtonProps } from "./DeleteItemButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

interface DeleteItemModalProps {
  ItemName?: string;
  ItemId?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteItemModal = ({
  ItemName,
  ItemId,
  isOpen,
  setIsOpen,
  isDeleting,
  setIsDeleting,
}: DeleteItemModalProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/menu-items/${ItemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }
      router.refresh();
      toast.success("Menu item deleted");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete menu item. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete a Menu Item</DialogTitle>
          <DialogDescription className="max-w-sm">
            Are you sure you want to delete your <strong>{ItemName}</strong>?
            <p className="my-2">
              This item will be permanently removed and cannot be recovered.
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button variant="default">Cancel</Button>
          </DialogClose>
          <Button onClick={handleDelete} variant={"dark"} type="submit">
            {!isDeleting ? "Delete" : <Spinner color="white" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItemModal;
