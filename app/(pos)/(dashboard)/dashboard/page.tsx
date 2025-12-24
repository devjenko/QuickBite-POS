import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import DateDisplay from "@/components/dashboard/DateDisplay";

export default function DashboardPage() {
  return (
    <div className="flex justify-between w-full">
      <DashboardGreeting />
      <DateDisplay />
    </div>
  );
}
