"use client";

import { Spinner } from "@/components/ui/spinner";
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import InputPassword from "@/components/shadcn-studio/input/input-password";

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

  const [businessId, setBusinessId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        businessId,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.log("Error found:", result.error);
        setError("Invalid business ID or password");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.log("Caught error:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold">{greeting()}</h1>
          <p className="text-muted-foreground text-md text-balance">
            Enter your credentials below to login
          </p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}
        <Field>
          <FieldLabel htmlFor="email">Business ID</FieldLabel>
          <Input
            id="email"
            type="text"
            value={businessId}
            placeholder="starbucks1234@quickbite"
            autoCapitalize="username"
            required
            onChange={(e) => setBusinessId(e.target.value)}
            disabled={isLoading}
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
          <InputPassword
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </Field>
        <Field>
          <Button type="submit" variant={"dark"} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                Logging in <Spinner />
              </span>
            ) : (
              "Login"
            )}
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
