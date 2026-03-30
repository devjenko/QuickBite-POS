import SectionHeader from "./SectionHeader";

interface PricingCardProps {
  tier: string;
  tierBg: string;
  tierColor: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  btnLabel: string;
  btnStyle: "filled-dark" | "filled-blue" | "outline";
  highlighted?: boolean;
}

function PricingCard({
  tier,
  tierBg,
  tierColor,
  name,
  price,
  period,
  description,
  features,
  btnLabel,
  btnStyle,
  highlighted = false,
}: PricingCardProps) {
  const btnClasses =
    btnStyle === "filled-dark"
      ? "bg-[var(--dark-blue)] text-white hover:opacity-90"
      : btnStyle === "filled-blue"
        ? "bg-[var(--blue)] text-white hover:opacity-90"
        : "bg-white text-[var(--dark-blue)] border border-[var(--border)] hover:border-[var(--dark-blue)]";

  return (
    <div
      className={`flex flex-col gap-6 p-8 md:p-[40px] w-full md:flex-1 bg-white rounded-[10px] border transition-shadow ${
        highlighted
          ? "border-[var(--dark-blue)] border-2 shadow-lg"
          : "border-[var(--border)]"
      }`}
    >
      {/* Tier badge */}
      <div
        className="flex items-center justify-center h-[26px] px-[10px] w-fit rounded-full text-[11px] font-semibold tracking-[0.5px]"
        style={{ backgroundColor: tierBg, color: tierColor }}
      >
        {tier}
      </div>

      {/* Name & description */}
      <div className="flex flex-col gap-1">
        <span className="text-[22px] md:text-[26px] font-bold text-[var(--black)] tracking-[-0.5px]">
          {name}
        </span>
        <span className="text-[13px] text-[var(--text-muted)]">
          {description}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-[4px]">
        <span className="text-[40px] md:text-[48px] font-bold text-[var(--black)] tracking-[-2px] leading-none">
          {price}
        </span>
        <span className="text-[13px] text-[var(--text-muted)] mb-[6px]">
          {period}
        </span>
      </div>

      {/* Feature list */}
      <div className="flex flex-col gap-[10px] border-t border-[var(--border)] pt-6">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M13.3 4.3L6.5 11.1L2.7 7.3"
                stroke="var(--success-green)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[13px] text-[var(--black)]">{f}</span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <button
        className={`flex items-center justify-center w-full h-[48px] rounded-sm text-[13px] font-semibold tracking-[0.3px] mt-auto transition-all ${btnClasses}`}
      >
        {btnLabel}
      </button>
    </div>
  );
}

const STARTER_FEATURES = [
  "1 location",
  "Up to 50 menu items",
  "Basic order tracking",
  "Community support",
  "Standard dashboard",
  "Cart & checkout",
  "Category organization",
  "QuickBite branding",
];

const PROFESSIONAL_FEATURES = [
  "Up to 5 locations",
  "Unlimited menu items",
  "Advanced analytics",
  "Priority support",
  "Custom categories",
  "Cloud image uploads",
  "Remove branding",
  "API access",
];

const ENTERPRISE_FEATURES = [
  "Unlimited locations",
  "Unlimited everything",
  "Dedicated support",
  "Custom integrations",
  "SLA guarantee",
  "Advanced security",
  "White-label option",
  "Onboarding assistance",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="flex flex-col w-full bg-[var(--off-white)] py-16 px-6 md:py-[100px] md:px-[120px] gap-12 md:gap-[64px]"
    >
      <SectionHeader
        label="Pricing"
        title={"Simple, transparent pricing"}
      />

      <div className="flex flex-col md:flex-row w-full gap-6">
        <PricingCard
          tier="Free"
          tierBg="var(--light-grey)"
          tierColor="var(--dark-blue)"
          name="Starter"
          price="$0"
          period="/mo"
          description="Perfect for getting started"
          features={STARTER_FEATURES}
          btnLabel="Start for Free"
          btnStyle="outline"
        />
        <PricingCard
          tier="Most popular"
          tierBg="var(--dark-blue)"
          tierColor="#ffffff"
          name="Professional"
          price="$29"
          period="/mo"
          description="For growing restaurants"
          features={PROFESSIONAL_FEATURES}
          btnLabel="Get Started"
          btnStyle="filled-dark"
          highlighted
        />
        <PricingCard
          tier="Enterprise"
          tierBg="var(--accent)"
          tierColor="#ffffff"
          name="Enterprise"
          price="$79"
          period="/mo"
          description="For restaurant groups"
          features={ENTERPRISE_FEATURES}
          btnLabel="Contact Sales"
          btnStyle="filled-blue"
        />
      </div>
    </section>
  );
}
