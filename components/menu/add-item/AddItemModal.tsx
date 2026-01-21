"use client";
import { Button } from "@/components/ui/Button";
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
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Dropdown from "@/components/menu/add-item/CategoryDropdown";
import AddItemDescription from "@/components/menu/add-item/AddItemDescription";
import ContentWrapper from "@/components/shared/ContentWrapper";
import AddImage from "./AddImage";
import PriceInput from "@/components/menu/add-item/PriceInput";
import Spinner from "@/components/ui/Spinner";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createMenuItem } from "@/app/actions/menu";

const AddItemModal = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createMenuItem({
        name,
        description,
        price,
        category,
        image,
      });

      router.refresh();

      // Reset form
      setName("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setImage(null);
      setIsOpen(false);
      toast.success("Menu item added successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add menu item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full cursor-pointer shadow-sm" variant="default">
            <ContentWrapper className="flex flex-col shadow-none justify-center items-center gap-2 py-6 ">
              <Image
                alt="Sidebar Icon"
                width={24}
                height={24}
                src={"/icons/add.svg"}
              />

            </ContentWrapper>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddItem}>
            <DialogHeader>
              <DialogTitle>Add a Menu Item</DialogTitle>
              <DialogDescription className="pb-3">
                Enter some information about the item you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <AddItemDescription
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <PriceInput value={price} onChange={setPrice} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Dropdown value={category} onValueChange={setCategory} />
              </div>
              <div className="grid gap-3 pb-3">
                <Label htmlFor="image">Image</Label>
                <AddImage image={image} setImage={setImage} />
              </div>
            </div>
            <DialogFooter className="p-3 flex gap-3">
              <DialogClose asChild>
                <Button variant="default">Cancel</Button>
              </DialogClose>
              <Button variant={"dark"} type="submit">
                {!isLoading ? "Add" : <Spinner color="white" />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddItemModal;
