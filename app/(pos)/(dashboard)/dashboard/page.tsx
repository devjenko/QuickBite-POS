import DashboardGreeting from "@/components/dashboard/dashboard-greeting";
import DateDisplay from "@/components/dashboard/date-display";

export default function DashboardPage() {
  return (
    <div className="flex justify-between w-full">
      <DashboardGreeting />
      <DateDisplay />
    </div>
  );
}
