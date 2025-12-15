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
import { useState } from "react";

// Random 4 Digit code generator
const generateCode = () => Math.floor(1000 + Math.random() * 9000);

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const staffID =
    firstName && lastName
      ? firstName.trim().toLowerCase() +
        lastName.trim()[0].toLowerCase() +
        generateCode() +
        "@quickbite"
      : "";

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
          <FieldLabel htmlFor="firstname">First Name</FieldLabel>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            id="firstname"
            type="text"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
          <Input
            onChange={(e) => setLastName(e.target.value)}
            id="lastname"
            type="text"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">
            Your Staff ID <strong>[Remember this]</strong>
          </FieldLabel>
          <Input id="email" type="email" value={staffID} readOnly />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Create a Password</FieldLabel>
          </div>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" variant={"dark"}>
            Create account
          </Button>
        </Field>

        <FieldDescription className="text-center flex justify-center items-center gap-2">
          Already have an account?
          <Link href={"/login"}>Login</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
