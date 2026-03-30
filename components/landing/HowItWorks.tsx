import SectionHeader from "./SectionHeader";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

function StepCard({
  number,
  title,
  description,
  highlighted = false,
}: StepCardProps) {
  return (
    <div
      className={`flex flex-col gap-4 p-8 md:p-[40px] rounded-[10px] border w-full md:flex-1 ${
        highlighted
          ? "border-[var(--dark-blue)] bg-[var(--ultra-light-blue)]"
          : "border-[var(--border-color)] bg-white"
      }`}
    >
      <span className="font-sans text-[44px] md:text-[48px] font-bold text-[var(--dark-blue)] tracking-[-2px] leading-none">
        {number}
      </span>
      <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-[var(--black)] leading-[1.3]">
        {title}
      </h3>
      <p className="font-sans text-[13px] md:text-[14px] text-[var(--text-muted)] leading-[1.6]">
        {description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="flex flex-col w-full bg-white py-16 px-6 md:py-[100px] md:px-[120px] gap-12 md:gap-[64px]">
      <SectionHeader
        label="How It Works"
        title={"Get started in\nthree simple steps"}
      />

      <div className="flex flex-col md:flex-row w-full gap-6">
        <StepCard
          number="01"
          title="Create your account"
          description="Sign up with your business ID and set up your restaurant profile in minutes."
        />
        <StepCard
          number="02"
          title="Build your menu"
          description="Add items with photos, descriptions, prices, and categories. Organize everything your way."
          highlighted
        />
        <StepCard
          number="03"
          title="Start taking orders"
          description="Your POS is ready. Ring up customers, manage orders, and watch your business grow."
        />
      </div>
    </section>
  );
}
