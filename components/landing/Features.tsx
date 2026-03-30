import SectionHeader from "./SectionHeader";

interface FeatureCardProps {
  accentColor: string;
  title: string;
  description: string;
}

function FeatureCard({ accentColor, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-5 p-8 md:p-[32px] border border-[var(--border-color)] rounded-[10px] bg-white w-full md:flex-1">
      <div
        className="w-[40px] h-[40px] rounded-[8px] shrink-0"
        style={{ backgroundColor: accentColor }}
      />
      <h3 className="font-sans text-[18px] font-bold text-[var(--black)] leading-[1.3]">
        {title}
      </h3>
      <p className="font-sans text-[14px] text-[var(--text-muted)] leading-[1.6]">
        {description}
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="flex flex-col w-full bg-[var(--background)] py-16 px-6 md:py-[100px] md:px-[120px] gap-12 md:gap-[64px]"
    >
      <SectionHeader
        label="Features"
        title={"Everything you need to\nrun your restaurant"}
        subtitle="Powerful tools designed for speed, simplicity, and scale."
      />

      <div className="flex flex-col md:flex-row w-full gap-6">
        <FeatureCard
          accentColor="var(--dark-blue)"
          title="Smart Menu Management"
          description="Create and organize your menu with categories, images, and descriptions. Update prices and items in real time."
        />
        <FeatureCard
          accentColor="var(--blue)"
          title="Instant Order Tracking"
          description="Track every order from placement to completion. Never lose track of what's happening in your kitchen."
        />
        <FeatureCard
          accentColor="var(--light-blue)"
          title="Real-Time Dashboard"
          description="Get a bird's-eye view of your business with live analytics, daily summaries, and performance insights."
        />
      </div>
    </section>
  );
}
