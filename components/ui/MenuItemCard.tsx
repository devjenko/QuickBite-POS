import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Label } from "@radix-ui/react-label";

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
    <Card
      className={`max-w-fit overflow-hidden pt-0 cursor-pointer  ${className}`}
    >
      <div className="w-full h-64 overflow-hidden flex items-center justify-center">
        <img
          src={getOptimizedImage(image)}
          alt={name || "Menu item"}
          className="min-w-fit h-full object-contain"
        />
      </div>

      <CardContent className="pt-6">
        <Label className="text-lg font-semibold">${price}</Label>
        <CardTitle className="mt-2">{name}</CardTitle>
      </CardContent>
      <CardFooter>
        <CardDescription>{description}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
