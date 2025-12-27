"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import DeleteItemButton from "@/components/menu/delete-item/DeleteItemButton";
import DeleteItemModal from "@/components/menu/delete-item/DeleteItemModal";
import { useState } from "react";
import { MenuItemCardProps } from "@/types/menu-item";
import { useCartStore } from "@/store/cart-store";

const MenuItemCard = ({
  className,
  image,
  name,
  price,
  description,
  id,
}: MenuItemCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { addItem } = useCartStore();

  // Optimize Cloudinary images
  const getOptimizedImage = (url: string) => {
    if (url.includes("cloudinary.com")) {
      // Use c_fit to preserve full image, or c_scale for simple resize
      return url.replace("/upload/", "/upload/q_100,f_auto,c_fit,w_1200/");
    }
    return url;
  };

  const handleAddToCart = () => {
    addItem({ image, name: name || "", price: price || 0, id, quantity: 1 });
  };

  return (
    <Card
      onClick={handleAddToCart}
      className={`${className} relative m-auto h-full `}
    >
      {/* delete item button */}
      <DeleteItemButton
        isDeleting={isDeleting}
        onClick={() => setIsOpen(true)}
        ItemId={id}
        ItemName={name || "this item"}
      />

      {isOpen && (
        <DeleteItemModal
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ItemName={name || "this item"}
          ItemId={id}
        />
      )}

      {/* card image */}
      <div className="w-full h-64 overflow-hidden flex items-center justify-center">
        {/* used img instead of the <Image /> component due to it having better performance + better image quality */}
        <img
          src={getOptimizedImage(image)}
          alt={name || "Menu item"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <CardContent>
        <Label className="text-lg font-semibold">${price}</Label>
        <CardTitle>{name}</CardTitle>
      </CardContent>
      <CardFooter>
        <CardDescription>{description}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
