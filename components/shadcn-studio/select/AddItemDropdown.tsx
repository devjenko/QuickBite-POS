import { useId } from "react";

import {
  GuitarIcon,
  HeadphonesIcon,
  MicVocalIcon,
  MusicIcon,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dropdown = () => {
  const id = useId();

  return (
    <div className="w-full  space-y-2">
      <Select defaultValue="rock">
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder="Select a music genre" />
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
              Sides
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
