import { Button } from "../ui/Button";
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
import ContentWrapper from "../ui/ContentWrapper";
import Image from "next/image";
import { ImageCrop } from ".";
import AddImage from "./AddImage";
import PriceInput from "./PriceInput";

const AddItemModal = () => {
  function handleAddItem() {}
  return (
    <div className="w-full">
      <Dialog>
        <form onSubmit={handleAddItem}>
          <DialogTrigger asChild>
            <Button className="w-full cursor-pointer" variant="default">
              <ContentWrapper className="flex flex-col justify-center items-center gap-2 py-6 ">
                <Image
                  alt="Sidebar Icon"
                  width={24}
                  height={24}
                  src={"/icons/add.svg"}
                />
                <span>Menu Item</span>
              </ContentWrapper>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a Menu Item</DialogTitle>
              <DialogDescription>
                Enter some information about the item you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name-1" name="name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <AddItemDescription />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <PriceInput />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Dropdown />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="image">Image</Label>
                <AddImage />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="default">Cancel</Button>
              </DialogClose>
              <Button variant={"dark"} type="submit">
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddItemModal;
