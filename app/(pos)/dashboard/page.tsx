import DateDisplay from "@/components/ui/DateDisplay";
import { auth } from "@/auth";
import CenterContentContainer from "@/components/ui/CenterContentContainer";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <CenterContentContainer>
      <div className="flex justify-between w-full">
        <p>
          Welcome, <strong>{session?.user?.firstName}.</strong>
        </p>
        <DateDisplay />
      </div>
    </CenterContentContainer>
  );
}
