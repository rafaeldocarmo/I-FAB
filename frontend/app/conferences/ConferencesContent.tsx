"use client";

import { Calendar, MapPin, ExternalLink, Clock, ChevronRight, Users, Award, Globe, Mail } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { UpcomingConferenceData, PastConferenceData } from "./page";

type Props = {
  upcoming: UpcomingConferenceData;
  past: PastConferenceData[];
};

export function ConferencesContent({ upcoming, past }: Props) {
  return (
    <>
      {/* Upcoming Conference */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full" style={{ backgroundColor: "#213885" }} />
            <h2 style={{  fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#081849" }}>
              Upcoming Conference
            </h2>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold ml-2"
              style={{ backgroundColor: "#213885", color: "#ffffff" }}
            >
              Next Event
            </span>
          </div>

          <div
            className="overflow-hidden rounded-3xl shadow-[0_12px_48px_rgba(8,24,73,0.45)]"
            style={{
              background: "linear-gradient(145deg, #081849 0%, #213885 48%, #152a66 100%)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 min-h-64 lg:h-auto">
                <ImageWithFallback
                  src='/footConference.png'
                  alt={`${upcoming.name}`}
                  className="h-full w-full object-cover"
                />
                {/* <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(8,24,73,0.75), rgba(33,56,133,0.45))",
                  }}
                /> */}
                <div className="absolute bottom-6 left-6">
                  <div
                    className="text-5xl font-bold opacity-90 text-[#213885]"
                  >
                    {upcoming.edition}
                  </div>
                  <div className="text-[#213885] text-xs font-semibold uppercase tracking-widest opacity-60">Edition</div>
                </div>
              </div>

              <div className="border-t border-white/10 p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ECDFD2] px-2.5 py-1 text-xs font-semibold text-[#081849]">
                    {upcoming.edition} Congress
                  </span>
                </div>

                <h3 className="mb-2 text-[1.5rem] font-bold text-white">{upcoming.name}</h3>
                <p className="mb-5 text-xs font-medium italic text-[#ECDFD2]/90">
                  Theme: &ldquo;{upcoming.theme}&rdquo;
                </p>

                <div className="mb-6 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <MapPin size={14} className="shrink-0 text-[#ECDFD2]" />
                    <span>{upcoming.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <Calendar size={14} className="shrink-0 text-[#ECDFD2]" />
                    <span>{upcoming.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <Clock size={14} className="shrink-0 text-[#ECDFD2]" />
                    <span>{upcoming.venue}</span>
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-white/75">{upcoming.description}</p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ECDFD2] px-6 py-3 text-sm font-semibold text-[#081849] shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                  >
                    <ExternalLink size={14} />
                    Learn More
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-white/80 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                  >
                    Register Interest
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px" style={{ backgroundColor: "#CCCACC" }} />
      </div>

      {/* Past Conferences */}
      <section className="py-20" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full" style={{ backgroundColor: "#CCCACC" }} />
            <h2 style={{  fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#081849" }}>
              Past Conferences
            </h2>
          </div>

          <div className="space-y-4">
            {past.map((conf) => (
              <div
                key={conf.year}
                className="group rounded-2xl p-6 transition-all duration-200"
                style={{ backgroundColor: "#ffffff", border: "1px solid #CCCACC" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#213885";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(33,56,133,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#CCCACC";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-xl flex flex-col items-center justify-center"
                      style={{ backgroundColor: "#ECDFD2" }}
                    >
                      <span
                        className="font-bold text-base"
                        style={{ color: "#213885",  lineHeight: 1 }}
                      >
                        {conf.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="font-bold text-base" style={{ color: "#081849" }}>
                        {conf.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6B7280" }}>
                      <MapPin size={11} />
                      <span>{conf.location}</span>
                    </div>
                    {conf.description && (
                      <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                        {conf.description}
                      </p>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #081849 0%, #213885 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4" style={{  fontSize: "1.7rem", fontWeight: 700 }}>
            Interested in Hosting a Future i-FAB Congress?
          </h2>
          <p className="text-sm leading-relaxed mb-7 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            i-FAB welcomes bids from institutions and cities around the world to host upcoming world congresses. Contact us to learn more about the hosting requirements and process.
          </p>
          <a
            href="mailto:info@i-fab.org"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: "#ECDFD2", color: "#081849" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#ECDFD2";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Submit a Bid
          </a>
        </div>
      </section>
    </>
  );
}
