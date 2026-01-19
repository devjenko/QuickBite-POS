"use client";
import POSLayout from "@/components/layout/POSLayout";
import NavSidebar from "@/components/sidebar/NavSidebar";
import CenterContentContainer from "@/components/shared/CenterContentContainer";
import StatsSidebar from "@/components/sidebar/StatsSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <POSLayout>
      <NavSidebar />
      <CenterContentContainer contained className="md:pl-50 md:pr-115 ">
        <main className="flex-1 overflow-y-auto m-auto">{children}</main>
      </CenterContentContainer>
      <StatsSidebar />
    </POSLayout>
  );
};

export default DashboardLayout;
