import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import Image from "next/image";
import { itemCategories } from "@/consts/menu/menu";

const CategoryDropdown = ({
  onValueChange,
  value,
}: {
  value?: string;
  onValueChange: (value: string) => void;
}) => {
  const id = useId();

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
