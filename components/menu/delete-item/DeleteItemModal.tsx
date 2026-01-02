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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
      setIsOpen(false);
      router.refresh();
      toast.success("Menu item deleted");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete menu item. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Add stopPropagation to the dialog content itself
  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        onClick={handleDialogClick}
        className="max-w-[425px] max-h-[90vh] flex flex-col overflow-hidden"
      >
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
          <DialogHeader>
            <DialogTitle>Delete a Menu Item</DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <span className="m-auto sm:m-0">
                Are you sure you want to delete your{" "}
                <strong className="break-all">{ItemName}</strong>?
              </span>

              <span>
                This item will be permanently removed and cannot be recovered.
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Fixed footer */}
        <DialogFooter className="flex gap-3 m-auto w-full shrink-0 mt-4">
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
