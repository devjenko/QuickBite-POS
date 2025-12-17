import { auth } from "@/auth";
import { redirect } from "next/navigation";

import PosLayout from "@/components/layout/DashboardLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return <main>{children}</main>;
}
