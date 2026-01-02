import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardLayout from "@/components/layout/DashboardLayout";

const settingsPage = async () => {
  const session = await auth();

  // check if password was verified and verify the user ID matches
  const cookieStore = await cookies();
  const verifiedUserId = cookieStore.get("settings-verified")?.value;

  // must have cookie and it must match current user's ID or else redirected to dashboard
  if (!session || !verifiedUserId || verifiedUserId !== session.user.id) {
    redirect("/dashboard");
  }

  return (
    <DashboardLayout>
      <div>settingsPage</div>
    </DashboardLayout>
  );
};

export default settingsPage;
