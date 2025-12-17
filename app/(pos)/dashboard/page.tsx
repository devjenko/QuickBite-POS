import DateDisplay from "@/components/ui/DateDisplay";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div className="flex justify-between w-full">
      <p>
        Welcome, <strong>{session?.user?.firstName}.</strong>
      </p>
      <DateDisplay />
    </div>
  );
}
