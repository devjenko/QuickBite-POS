"use client";

import { cn } from "@/lib/utils";
import { Button } from "../../../components/ui/Button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // Dynamic greeting
  function greeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold">{greeting()}</h1>
          <p className="text-muted-foreground text-md text-balance">
            Enter your credentials below to login
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
            Login
          </Button>
        </Field>

        <FieldDescription className="text-center flex justify-center items-center gap-2">
          Don&apos;t have an account?
          <Link href={"/sign-up"}>Sign Up</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
