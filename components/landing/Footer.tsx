const productLinks = ["Features", "Pricing", "Integrations", "Changelog"];
const companyLinks = ["About", "Blog", "Careers", "Contact"];
const resourceLinks = ["Documentation", "API Reference", "Status", "Support"];

export default function Footer() {
  return (
    <footer className="flex flex-col w-full bg-[var(--dark-blue)]">
      {/* Top */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-[80px] px-6 md:px-[120px] py-12 md:py-[64px]">
        {/* Brand */}
        <div className="flex flex-col gap-6 md:w-[280px] md:shrink-0">
          <div className="flex items-center gap-[10px]">
            <div className="w-[10px] h-[10px] bg-[var(--light-blue)] rounded-[2px] shrink-0" />
            <span className="text-[18px] font-bold text-white tracking-[-0.3px]">
              QuickBite
            </span>
          </div>
          <p className="text-[13px] text-white/60 leading-[1.7] max-w-[260px]">
            An elegant restaurant POS system built for speed, simplicity, and
            scale.
          </p>
          <div className="flex gap-[10px]">
            {/* X (Twitter) */}
            <a
              href="#"
              className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="X"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.733 16H20L8.267 4z" />
                <path d="M4 20l6.768-6.768M15.232 10.232L20 4" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="#"
              className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="GitHub"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-3 md:flex md:flex-1 gap-8 md:gap-[80px]">
          {[
            { heading: "Product", links: productLinks },
            { heading: "Company", links: companyLinks },
            { heading: "Resources", links: resourceLinks },
          ].map((col) => (
            <div key={col.heading} className="flex flex-col gap-4 md:gap-[16px]">
              <span className="text-[12px] font-semibold text-white/40 uppercase tracking-[1px]">
                {col.heading}
              </span>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[13px] text-white/70 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full px-6 md:px-[120px] py-4 md:h-[56px] border-t border-t-white/10 gap-3 sm:gap-0">
        <span className="text-[12px] text-white/40">
          &copy; 2025 QuickBite
        </span>
        <div className="flex items-center gap-6 md:gap-[32px]">
          <a
            href="#"
            className="text-[12px] text-white/40 hover:text-white/70 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[12px] text-white/40 hover:text-white/70 transition-colors"
          >
            Terms
          </a>
          <span className="text-[12px] font-semibold text-[var(--light-blue)]">
            v1.0
          </span>
        </div>
      </div>
    </footer>
  );
}
