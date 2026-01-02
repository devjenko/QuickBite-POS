import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import DateDisplay from "@/components/dashboard/DateDisplay";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex justify-between w-full">
        <DashboardGreeting />
        <DateDisplay />
      </div>
    </DashboardLayout>
  );
}
