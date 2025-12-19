"use client";

import { useId, useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

const InputPassword = () => {
  const [isVisible, setIsVisible] = useState(false);

  const id = useId();

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="relative">
        <Input
          id={id}
          type={isVisible ? "text" : "password"}
          className="pr-9"
        />
        <Button
          type="button"
          size="icon"
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-2 right-0 rounded-l-none hover:bg-transparent"
        >
          {isVisible ? <EyeIcon /> : <EyeOffIcon />}
          <span className="sr-only">
            {isVisible ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default InputPassword;
