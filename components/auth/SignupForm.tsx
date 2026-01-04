"use client";

import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";
import InputPassword from "@/components/auth/InputPassword";
import { CopyButton } from "@/components/auth/CopyTextBtn";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedBusinessId, setGeneratedBusinessId] = useState();
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  function validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Must contain at least one number");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Must contain at least one special character");
    }

    return { isValid: errors.length === 0, errors };
  }

  // Validate password on change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Show real-time validation
    const validation = validatePassword(newPassword);
    setPasswordErrors(validation.errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const passwordValidation = validatePassword(password);

    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors.join(". "));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setTimeout(() => {
        setGeneratedBusinessId(data.businessId);
      }, 0);

      // Success! Show the generated business ID
      setGeneratedBusinessId(data.businessId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  // If account was created successfully, show success message
  if (generatedBusinessId) {
    return (
      <div className={cn("flex flex-col gap-6", className)}>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold">
            Account Created! <span className="absolute">🎉</span>
          </h1>
          <p className="text-muted-foreground text-md text-balance">
            Your business ID has been generated. <br /> Please save it to login.
          </p>
        </div>
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-xl font-bold break-all flex justify-center gap-2 items-center">
            {generatedBusinessId}{" "}
            <CopyButton variant={"muted"} content={generatedBusinessId} />
          </p>
        </div>
        <Button asChild variant="dark">
          <Link href="/login" prefetch={false}>
            Go to Login
          </Link>
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
          <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
          <Input
            onChange={(e) => setBusinessName(e.target.value)}
            id="firstname"
            type="text"
            required
            disabled={isLoading}
            value={businessName}
            autoComplete="off"
          />
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Create a Password</FieldLabel>
          </div>
          <InputPassword
            onChange={handlePasswordChange}
            id="password"
            disabled={isLoading}
            value={password}
            required
            autoComplete="off"
          />

          {/* Real-time password requirements display */}
          {password.length > 0 && passwordErrors.length > 0 && (
            <ul className="text-sm space-y-1 mt-2">
              {passwordErrors.map((error, index) => (
                <li key={index} className="text-destructive text-xs">
                  • {error}
                </li>
              ))}
            </ul>
          )}

          {/* Show success when all requirements met */}
          {password.length > 0 && passwordErrors.length === 0 && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Password meets all requirements
            </p>
          )}
        </Field>

        <Field>
          <Button type="submit" variant="dark" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                Creating Account <Spinner />
              </span>
            ) : (
              "Create account"
            )}
          </Button>
        </Field>

        <FieldDescription className="text-center flex justify-center items-center gap-2">
          Already have an account?
          <Link href="/login" prefetch={false}>
            Login
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
