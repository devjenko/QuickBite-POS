import SectionHeader from "./SectionHeader";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accentColor: string;
}

function TestimonialCard({
  quote,
  name,
  role,
  initials,
  accentColor,
}: TestimonialCardProps) {
  return (
    <div
      className="flex flex-col gap-6 p-8 md:p-[40px] border-l-4 w-full md:flex-1 bg-white rounded-[10px]"
      style={{ borderLeftColor: accentColor }}
    >
      <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#180e19] leading-[1.7]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-[12px]">
        <div
          className="w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <span className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-white">
            {initials}
          </span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-[#180e19]">
            {name}
          </span>
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-[#6b7280]">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="flex flex-col w-full bg-[#fafafa] py-16 px-6 md:py-[100px] md:px-[120px] gap-12 md:gap-[64px]">
      <SectionHeader
        label="Testimonials"
        title={"Loved by restaurant owners"}
      />

      <div className="flex flex-col md:flex-row w-full gap-6">
        <TestimonialCard
          quote="QuickBite transformed how we handle orders during rush hour. Setup took 15 minutes and our staff picked it up immediately."
          name="Maria Santos"
          role="Owner at Bella's Kitchen"
          initials="MS"
          accentColor="#003049"
        />
        <TestimonialCard
          quote="The menu management is incredibly intuitive. We update our specials daily and it's never been easier."
          name="James Chen"
          role="Manager at Harbor Grill"
          initials="JC"
          accentColor="#00669b"
        />
        <TestimonialCard
          quote="Finally a POS that doesn't look like it was designed in 2005. Our customers notice the difference."
          name="Priya Patel"
          role="Founder of Spice Route"
          initials="PP"
          accentColor="#008ed8"
        />
      </div>
    </section>
  );
}
