"use client";
import CartSidebar from "../sidebar/CartSidebar";
import NavSidebar from "../sidebar/NavSidebar";

interface PosLayoutProps {
  children: React.ReactNode;
}

const PosLayout = ({ children }: PosLayoutProps) => {
  return (
    <div className="min-h-screen overflow-x-hidden flex">
      <NavSidebar />
      {children}
      <CartSidebar />
    </div>
  );
};

export default PosLayout;
