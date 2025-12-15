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

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedStaffId, setGeneratedStaffId] = useState("");

  // Preview staff ID (shown while typing, but not final)
  const previewStaffId =
    firstName && lastName
      ? `${firstName.trim().toLowerCase()}${lastName
          .trim()[0]
          ?.toLowerCase()}XXXX@quickbite`
      : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success! Show the generated staff ID
      setGeneratedStaffId(data.staffId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  // If account was created successfully, show success message
  if (generatedStaffId) {
    return (
      <div className={cn("flex flex-col gap-6", className)}>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold">Account Created! 🎉</h1>
          <p className="text-muted-foreground text-md text-balance">
            Your staff ID has been generated. Please save it - you'll need it to
            login.
          </p>
        </div>
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Your Staff ID:</p>
          <p className="text-2xl font-bold break-all">{generatedStaffId}</p>
        </div>
        <Button asChild variant="dark">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold">Welcome to the family.</h1>
          <p className="text-muted-foreground text-md text-balance">
            Enter your credentials below to sign up
          </p>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="firstname">First Name</FieldLabel>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            id="firstname"
            type="text"
            required
            disabled={isLoading}
            value={firstName}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
          <Input
            onChange={(e) => setLastName(e.target.value)}
            id="lastname"
            type="text"
            required
            disabled={isLoading}
            value={lastName}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="staffid-preview">
            Your Staff ID Preview
          </FieldLabel>
          <Input
            id="staffid-preview"
            type="text"
            value={previewStaffId}
            readOnly
            disabled
          />
          <FieldDescription className="text-xs">
            The XXXX will be replaced with a random 4-digit number
          </FieldDescription>
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Create a Password</FieldLabel>
          </div>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            required
            disabled={isLoading}
            value={password}
            minLength={8}
          />
          <FieldDescription className="text-xs">
            Must be at least 8 characters
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit" variant="dark" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </Field>

        <FieldDescription className="text-center flex justify-center items-center gap-2">
          Already have an account?
          <Link href="/login">Login</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
