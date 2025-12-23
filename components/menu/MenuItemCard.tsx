import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";

type MenuItemCardProps = {
  className?: string;
  image: string;
  name: string | null;
  price: number | null;
  description: string | null;
};

const MenuItemCard = ({
  className,
  image,
  name,
  price,
  description,
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
    <Card className={`${className}`}>
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
