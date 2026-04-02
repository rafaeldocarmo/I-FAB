"use client";

import Link from "next/link";
import { Globe, Users, Calendar, ChevronRight } from "lucide-react";

/** Mesmo gradiente de fundo que `CTABanner` */
const SECTION_BG = "linear-gradient(135deg,rgb(24, 49, 124) 0%,rgb(36, 60, 141) 100%)" as const;
const ICON_BG = "linear-gradient(135deg,rgb(24, 49, 124) 0%,rgb(36, 60, 141) 100%)";

const highlightCards = [
  {
    icon: Globe,
    title: "Our Mission",
    description:
      "Increase visibility of biomechanics research, promote the scientific value of foot and ankle biomechanics to research users, coordinate international research, and encourage multidisciplinary collaboration across engineering, podiatry, orthopaedics, sports science, and industry.",
    link: "/mission",
    linkLabel: "Learn More",
  },
  {
    icon: Users,
    title: "Scientific Board",
    description:
      "Our board comprises world-leading researchers and clinicians who guide the scientific direction of foot and ankle biomechanics and help connect disciplines across the community.",
    link: "/committee",
    linkLabel: "Meet the Team",
  },
  {
    icon: Calendar,
    title: "Conferences",
    description:
      "The biannual i-FAB Congress showcases cutting-edge research and builds bridges between academia, industry, and applied practice—alongside sessions at major international conferences worldwide.",
    link: "/conferences",
    linkLabel: "View Events",
  },
];

export function HighlightCards() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: SECTION_BG }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center md:mb-20">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] md:text-base"
            style={{ color: "#fff" }}
          >
            What We Do
          </p>
          <h2
            className="mb-6 px-2"
            style={{
              fontSize: "clamp(1.85rem, 3.5vw, 2.85rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            Advancing Science, Together
          </h2>
          <p
            className="mx-auto max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            We raise the profile of foot and ankle research through international
            events and partnerships, bridge universities and industry, and connect
            experts across biomechanics, engineering, and clinical fields — so
            science translates into better footwear, orthotics, performance
            insight, and surgical innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {highlightCards.map((card) => (
            <div
              key={card.title}
              className="group cursor-pointer rounded-2xl p-8 transition-all duration-300 md:p-9"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #CCCACC",
                boxShadow: "0 2px 12px rgba(8,24,73,0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(33,56,133,0.14)";
                (e.currentTarget as HTMLElement).style.borderColor = "#213885";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(8,24,73,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "#CCCACC";
              }}
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl md:h-16 md:w-16"
                style={{ background: ICON_BG }}
              >
                <card.icon size={28} className="text-white" strokeWidth={2} />
              </div>
              <h3
                className="mb-4 text-xl font-bold leading-snug md:text-[1.35rem]"
                style={{ color: "#081849" }}
              >
                {card.title}
              </h3>
              <p
                className="mb-6 text-base leading-relaxed md:text-[1.05rem]"
                style={{ color: "#6B7280" }}
              >
                {card.description}
              </p>
              <Link
                href={card.link}
                className="inline-flex items-center gap-1.5 text-base font-semibold transition-all duration-200 border-b-2 border-transparent hover:border-[#213885]"
                style={{ color: "#213885" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
              >
                {card.linkLabel}
                <ChevronRight size={16} strokeWidth={2} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
