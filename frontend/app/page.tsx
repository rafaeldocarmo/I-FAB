import { HeroSection } from "@/components/sections/HeroSection";
import { HighlightCards } from "@/components/sections/HighlightCards";
import { UpcomingConferenceHome } from "@/components/sections/UpcomingConferenceHome";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px" style={{ backgroundColor: "#CCCACC" }} />
      </div>

      <HighlightCards />

      <UpcomingConferenceHome />

      <CTABanner />
    </>
  );
}
