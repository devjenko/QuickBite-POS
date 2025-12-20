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
import AddImage from "./AddImage";
import PriceInput from "./PriceInput";
import { useState } from "react";

const AddItemModal = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          category,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add menu item");
      }

      const menuItem = await response.json();
      console.log("Menu item added:", menuItem);

      // Reset form
      setName("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add menu item. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Dialog>
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
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddItemModal;
