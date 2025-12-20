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

const Dropdown = ({
  onValueChange,
  value,
}: {
  value?: string;
  onValueChange: (value: string) => void;
}) => {
  const id = useId();

  return (
    <div className="w-full  space-y-2">
      <Select value={value} onValueChange={onValueChange} defaultValue="none">
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="meals">
              <img width={20} height={20} src="/icons/meals.svg" alt="meals" />
              Meals
            </SelectItem>
            <SelectItem value="burgers">
              <img
                width={20}
                height={20}
                src="/icons/burgers.svg"
                alt="burger"
              />
              Burgers
            </SelectItem>
            <SelectItem value="sandwiches">
              <img
                width={20}
                height={20}
                src="/icons/sandwiches.svg"
                alt="meals"
              />
              Sandwiches
            </SelectItem>
            <SelectItem value="sides">
              <img width={20} height={20} src="/icons/fries.svg" alt="fries" />
              Sides
            </SelectItem>
            <SelectItem value="drinks">
              <img
                width={20}
                height={20}
                src="/icons/drinks.svg"
                alt="drinks"
              />
              Drinks
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
