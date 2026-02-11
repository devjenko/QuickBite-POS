import POSLayout from "@/components/layout/POSLayout";
import NavSidebar from "@/components/sidebar/NavSidebar";
import CenterContentContainer from "@/components/shared/CenterContentContainer";
import StatsSidebarWrapper from "../sidebar/StatsSidebarWrapper";
import MobileNavbar from "../dashboard/MobileNavbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <POSLayout>
      <MobileNavbar />
      <NavSidebar />
      <CenterContentContainer sidebarLeft sidebarRightWide className="flex flex-col">
        {children}
      </CenterContentContainer>
      <StatsSidebarWrapper />
    </POSLayout>
  );
};

export default DashboardLayout;
