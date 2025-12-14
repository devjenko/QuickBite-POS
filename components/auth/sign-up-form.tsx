import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface SignUpFormProps extends React.ComponentProps<"form"> {
  onAuthenticated?: () => void;
}

export function SignUpForm({
  className,
  onAuthenticated,
  ...props
}: SignUpFormProps) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold">Welcome to the family.</h1>
          <p className="text-muted-foreground text-md text-balance">
            Enter your credentials below to sign up
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Staff ID</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="john1234@quickbite"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-md underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" variant={"dark"}>
            Sign up
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an account?{" "}
          <a
            href="#"
            onClick={onAuthenticated}
            className="underline underline-offset-4"
          >
            Login
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
