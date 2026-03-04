"use client";

export default function SidebarScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto whitespace-nowrap w-full mb-4 xl:hidden hide-scrollbar">
      {children}
    </div>
  );
}
