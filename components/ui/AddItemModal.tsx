import { Button } from "./Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Dropdown from "../shadcn-studio/select/AddItemDropdown";
import AddItemDescription from "../shadcn-studio/textarea/AddItemDescription";
import ContentWrapper from "./ContentWrapper";
import Image from "next/image";

const AddItemModal = () => {
  return (
    <div className="w-full">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="w-full cursor-pointer" variant="default">
              <ContentWrapper className="flex flex-col justify-center items-center gap-2 py-6 ">
                <Image
                  alt="Sidebar Icon"
                  width={24}
                  height={24}
                  src={"/icons/add.svg"}
                />
                <span>Add Item</span>
              </ContentWrapper>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a Menu Item</DialogTitle>
              <DialogDescription>
                Enter some information about the item you want to add. Click
                save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Description</Label>
                <AddItemDescription />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Price</Label>
                <Input id="username-1" name="username" defaultValue={"$ "} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Category</Label>
                <Dropdown />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Image</Label>
                <Dropdown />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="default">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddItemModal;
