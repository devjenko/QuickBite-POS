import type { Metadata } from "next";
import "@/styles/globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "QuickBite",
  description: "An elegant fast food POS system.",
  icons: {
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-[family-name:var(--font-inter)] bg-white antialiased overflow-hidden  max-w-750 m-auto">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
