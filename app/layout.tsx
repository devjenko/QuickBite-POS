import type { Metadata } from "next";
import "@/styles/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "QuickBite",
  description: "An elegant fast food POS system.",
  icons: {
    icon: "/quickbite-icon.svg",
    shortcut: "/quickbite-icon.ico",
    apple: "/quickbite-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-[family-name:var(--font-inter)] antialiased max-w-[3000px] m-auto">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
