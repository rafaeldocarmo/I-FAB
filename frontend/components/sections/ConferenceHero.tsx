"use client";

/**
 * Hero da página Conferences — texto + carrossel (`PublicImageCarousel`).
 * Slides: `CONGRESS_CAROUSEL_SLIDES` em `lib/publicCarouselSlides.ts`, ou fallback das imagens legacy em `public/`.
 */

import { ChevronRight } from "lucide-react";
import { PublicImageCarousel } from "@/components/public/PublicImageCarousel";
import {
  CONGRESS_CAROUSEL_SLIDES,
  type PublicCarouselSlide,
} from "@/lib/publicCarouselSlides";

const GRADIENT_BAR = "linear-gradient(90deg, #081849 0%, #213885 100%)";

/** Fallback se `CONGRESS_CAROUSEL_SLIDES` estiver vazio — ficheiros na raiz de `public/`. */
const LEGACY_CONFERENCE_HERO_SLIDES: PublicCarouselSlide[] = [
  { src: "/carrossel1.png", alt: "i-FAB congress" },
  { src: "/carrossel2.jpg", alt: "i-FAB congress" },
  { src: "/carrossel3.png", alt: "i-FAB congress" },
  { src: "/carrossel4.png", alt: "i-FAB congress" },
  { src: "/carrossel5.jpg", alt: "i-FAB congress" },
  { src: "/carrossel6.jpg", alt: "i-FAB congress" },
  { src: "/carrossel7.jpg", alt: "i-FAB congress" },
  { src: "/carrossel8.jpg", alt: "i-FAB congress" },
];

function congressHeroSlides(): PublicCarouselSlide[] {
  if (CONGRESS_CAROUSEL_SLIDES.length > 0) return CONGRESS_CAROUSEL_SLIDES;
  return LEGACY_CONFERENCE_HERO_SLIDES;
}

const CONGRESS_AIMS = [
  "Showcase cutting-edge biomechanics research.",
  "Build bridges between academia, industry, and applied practice.",
  "Foster connections between disciplines that traditionally might not intersect.",
  "Highlight biomechanics in new regions and territories.",
];

export function ConferenceHero() {
  const slides = congressHeroSlides();

  return (
    <section className="bg-white pb-20 pt-24 sm:pb-28 sm:pt-28 md:px-4 md:pb-12 md:pt-32 lg:px-8 lg:pb-8 lg:pt-36">
      <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">
        <p className="mb-2 text-[20px] font-semibold uppercase tracking-[0.22em] text-[#213885] md:mb-3">
          Congresses
        </p>
      </div>

      <div className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-6 text-base leading-relaxed text-[#374151] md:text-lg lg:text-[1.125rem]">
              <p className="mb-5 text-xl font-semibold uppercase tracking-widest text-[#213885]">
                Our biannual i-FAB congress is an international meeting designed to
              </p>
              {CONGRESS_AIMS.map((line) => (
                <div key={line} className="flex items-start gap-2.5">
                  <ChevronRight className="mt-1.5 h-5 w-5 shrink-0 text-[#213885]" />
                  <p className="m-0">{line}</p>
                </div>
              ))}
            </div>

            <div className="relative w-full min-w-0">
              {slides.length > 0 ? (
                <PublicImageCarousel
                  variant="hero"
                  slides={slides}
                  ariaLabel="i-FAB congress gallery"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div
        className="mx-auto h-[4px] w-16 rounded-sm md:mb-10 md:h-[5px] md:w-20"
        style={{ background: GRADIENT_BAR }}
        aria-hidden
      />
    </section>
  );
}
