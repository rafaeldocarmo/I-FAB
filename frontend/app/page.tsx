import { HeroSection } from "@/components/sections/HeroSection";
import { HighlightCards } from "@/components/sections/HighlightCards";
import { UpcomingConferenceHome } from "@/components/sections/UpcomingConferenceHome";
import { CTABanner } from "@/components/sections/CTABanner";
import { client } from "@/sanity/client";
import { CONGRESS_LIST_QUERY } from "@/lib/congressQuery";
import type { Congress } from "@/lib/types";
import {
  mapCongressToHomeProps,
  pickUpcomingCongress,
} from "@/lib/mapCongressToHome";

const fetchOptions = { next: { revalidate: 30 } };

export default async function HomePage() {
  const congressesRaw = await client.fetch<Congress[]>(
    CONGRESS_LIST_QUERY,
    {},
    fetchOptions,
  );
  const upcoming = pickUpcomingCongress(congressesRaw);
  const upcomingHomeProps = upcoming
    ? mapCongressToHomeProps(upcoming)
    : {};

  return (
    <>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px" style={{ backgroundColor: "#CCCACC" }} />
      </div>

      <HighlightCards />

      <UpcomingConferenceHome {...upcomingHomeProps} />

      <CTABanner />
    </>
  );
}
