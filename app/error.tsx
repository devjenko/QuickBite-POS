"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-[var(--Grey)]">An unexpected error occurred.</p>
      <Button variant="dark" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
