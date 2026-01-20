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
      <CenterContentContainer sidebarLeft sidebarRightWide>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </CenterContentContainer>
      <StatsSidebar />
    </POSLayout>
  );
};

export default DashboardLayout;
