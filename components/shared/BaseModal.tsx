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
import Spinner from "@/components/ui/Spinner";
import { FormEvent } from "react";

export interface BaseModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  isLoading?: boolean | undefined;
  onSubmit?: (e: FormEvent<Element>) => void;
  btnName?: string;
  footer?: React.ReactNode;
}

const BaseModal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  onSubmit,
  isLoading,
  btnName,
  footer,
}: BaseModalProps) => {
  // Add stopPropagation to the dialog content itself
  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        onClick={handleDialogClick}
        className="max-w-[425px] overflow-hidden"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <span className=" m-auto sm:m-0">{description}</span>
          </DialogDescription>

          {children}
        </DialogHeader>

        {footer && (
          <DialogFooter className="flex gap-3  m-auto  w-full">
            <DialogClose asChild>
              <Button variant="default">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={onSubmit}
              variant={"dark"}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  {btnName}ing <Spinner />
                </span>
              ) : (
                btnName
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;
