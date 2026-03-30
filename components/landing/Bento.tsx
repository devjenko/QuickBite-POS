import SectionHeader from "./SectionHeader";

export default function Bento() {
  return (
    <section className="flex flex-col w-full bg-[#ffffff] py-16 px-6 md:py-[100px] md:px-[120px] gap-10 md:gap-[48px]">
      <SectionHeader
        label="Capabilities"
        title={"Everything you need to run\nyour restaurant"}
        titleWidth="w-full max-w-[800px]"
      />

      <div className="flex flex-col w-full gap-5">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row w-full gap-5">
          {/* Bento A — DarkBlue accent bg */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[320px] bg-[#003049] rounded-[10px] w-full md:flex-1">
            <h3 className="font-[family-name:var(--font-inter)] text-[22px] md:text-[26px] font-semibold text-white tracking-[-0.5px] leading-[1.2]">
              Multi-Tenant Isolation
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/80 leading-[1.7]">
              Each business gets its own secure, isolated workspace. Your data stays yours.
            </p>
            <div className="flex items-center justify-center h-[28px] px-[12px] bg-white/10 rounded-sm w-fit">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold text-white tracking-[1px]">Secure</span>
            </div>
          </div>

          {/* Bento B */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[320px] bg-white border border-[#e5e5e5] rounded-[10px] w-full md:flex-1">
            <h3 className="font-[family-name:var(--font-inter)] text-[22px] md:text-[26px] font-semibold text-[#180e19] tracking-[-0.5px] leading-[1.2]">
              Category Organization
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#6b7280] leading-[1.7]">
              Sort your menu into breakfast, lunch, dinner, drinks, desserts, and custom categories.
            </p>
          </div>

          {/* Bento C */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[320px] bg-white border border-[#e5e5e5] rounded-[10px] w-full md:flex-1">
            <h3 className="font-[family-name:var(--font-inter)] text-[22px] md:text-[26px] font-semibold text-[#180e19] tracking-[-0.5px] leading-[1.2]">
              Cloud Image Storage
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#6b7280] leading-[1.7]">
              Upload beautiful food photos powered by Cloudinary. Optimized and fast.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row w-full gap-5">
          {/* Bento D */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[260px] bg-white border border-[#e5e5e5] rounded-[10px] w-full md:flex-1">
            <h3 className="font-[family-name:var(--font-inter)] text-[22px] md:text-[26px] font-semibold text-[#180e19] tracking-[-0.5px] leading-[1.2]">
              Secure Authentication
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#6b7280] leading-[1.7]">
              Business ID login, password reset, and session management built in.
            </p>
          </div>

          {/* Bento E — Blue border accent */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[260px] bg-white border-2 border-[#00669b] rounded-[10px] w-full md:flex-1">
            <h3 className="font-[family-name:var(--font-inter)] text-[22px] md:text-[26px] font-semibold text-[#180e19] tracking-[-0.5px] leading-[1.2]">
              Cart & Checkout
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#6b7280] leading-[1.7]">
              Smooth cart experience with quantity management and persistent state.
            </p>
            <div className="flex items-center justify-center h-[28px] px-[12px] bg-[#f4fbff] border border-[#00669b] rounded-sm w-fit">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold text-[#00669b] tracking-[1px]">Fast</span>
            </div>
          </div>

          {/* Bento F */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[260px] bg-white border border-[#e5e5e5] rounded-[10px] w-full md:flex-1">
            <h3 className="font-[family-name:var(--font-inter)] text-[22px] md:text-[26px] font-semibold text-[#180e19] tracking-[-0.5px] leading-[1.2]">
              Performance Analytics
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#6b7280] leading-[1.7]">
              Track sales, popular items, and daily trends from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
