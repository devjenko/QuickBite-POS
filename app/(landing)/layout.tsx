export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-none w-screen overflow-y-auto overflow-x-hidden h-screen">
      {children}
    </div>
  );
}
