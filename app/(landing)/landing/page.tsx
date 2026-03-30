import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Divider from "@/components/landing/PixelDivider";
import Logos from "@/components/landing/Logos";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Stats from "@/components/landing/Stats";
import Testimonials from "@/components/landing/Testimonials";
import Bento from "@/components/landing/Bento";
import Comparison from "@/components/landing/Comparison";
import Showcase from "@/components/landing/Showcase";
import FAQ from "@/components/landing/FAQ";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "QuickBite — The Elegant Restaurant POS",
  description:
    "A modern point-of-sale system built for restaurants that care about speed, simplicity, and great design.",
};

export default function LandingPage() {
  return (
    <main className="flex flex-col w-full bg-white pt-18">
      <Navbar />
      <Hero />
      <Divider />
      <Logos />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Bento />
      <Comparison />
      <Showcase />
      <FAQ />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
