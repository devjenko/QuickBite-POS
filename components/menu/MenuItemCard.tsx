import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import DeleteItemButton from "@/components/menu/DeleteItemButton";

type MenuItemCardProps = {
  className?: string;
  image: string;
  name: string | null;
  price: number | null;
  description: string | null;
  id: string;
};

const MenuItemCard = ({
  className,
  image,
  name,
  price,
  description,
  id,
}: MenuItemCardProps) => {
  // Optimize Cloudinary images
  const getOptimizedImage = (url: string) => {
    if (url.includes("cloudinary.com")) {
      // Use c_fit to preserve full image, or c_scale for simple resize
      return url.replace("/upload/", "/upload/q_100,f_auto,c_fit,w_1200/");
    }
    return url;
  };

  return (
    <Card className={`${className} relative`}>
      {/* delete button */}
      <DeleteItemButton ItemId={id} ItemName={name || "this item"} />

      {/* card image */}
      <div className="w-full h-64 overflow-hidden flex items-center justify-center">
        <img
          src={getOptimizedImage(image)}
          alt={name || "Menu item"}
          className="w-full h-full object-cover"
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
