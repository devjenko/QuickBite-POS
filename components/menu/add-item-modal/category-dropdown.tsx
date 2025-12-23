import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const CategoryDropdown = ({
  onValueChange,
  value,
}: {
  value?: string;
  onValueChange: (value: string) => void;
}) => {
  const id = useId();

  const itemCategories = [
    { name: "Breakfast" },
    { name: "Lunch" },
    { name: "Dinner" },

    { name: "Starters" },
    { name: "Main Courses" },
    { name: "Deserts" },
    { name: "Sides" },
    { name: "Burgers" },
    { name: "Sandwiches" },
    { name: "Soups & Salads" },
    { name: "Pizzas" },

    { name: "Hot Drinks" },
    { name: "Cold Drinks" },
    { name: "Alcoholic Drinks" },
    { name: "Coffee" },
  ];

  // Helper function to normalize category name for file paths
  const normalizeForPath = (name: string) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s*&\s*/g, "and")
      .replace(/\s+/g, "");
  };

  return (
    <div className="w-full  space-y-2">
      <Select value={value} onValueChange={onValueChange} defaultValue="none">
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="overflow-y-auto h-40">
            <SelectLabel>Categories</SelectLabel>
            {itemCategories.map((item, index) => (
              <SelectItem key={index} value={item.name}>
                <Image
                  width={20}
                  height={20}
                  unoptimized
                  alt={item.name}
                  src={"/icons/" + normalizeForPath(item.name) + ".svg"}
                />
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryDropdown;
