import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  // if user is not authed then redirect to login page
  if (!session?.user) {
    redirect("/login");
  }

  // if user is authed redirect to dashboard page
  redirect("/dashboard");
}
