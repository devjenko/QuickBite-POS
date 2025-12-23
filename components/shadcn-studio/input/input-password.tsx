"use client";

import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputPassword = ({ className, ...props }: InputPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="relative">
        <Input
          {...props}
          id={props.id || id}
          type={isVisible ? "text" : "password"}
          className={`pr-9 ${className || ""}`}
        />
        <Button
          type="button"
          size="icon"
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-2 right-0 rounded-l-none bg-transparent hover:bg-transparent"
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
