import DashboardGreeting from "@/components/ui/DashboardGreeting";
import DateDisplay from "@/components/ui/DateDisplay";

export default function DashboardPage() {
  return (
    <div className="flex justify-between w-full">
      <DashboardGreeting />
      <DateDisplay />
    </div>
  );
}
