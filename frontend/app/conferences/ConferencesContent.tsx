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
            className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid #CCCACC", boxShadow: "0 8px 40px rgba(8,24,73,0.10)" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-64">
                <ImageWithFallback
                  src={upcoming.image}
                  alt={`${upcoming.name}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(8,24,73,0.6), rgba(33,56,133,0.3))" }}
                />
                <div className="absolute bottom-6 left-6">
                  <div
                    className="text-5xl font-bold opacity-30 text-white"
                  >
                    {upcoming.edition}
                  </div>
                  <div className="text-white text-xs font-semibold uppercase tracking-widest opacity-60">Edition</div>
                </div>
              </div>

              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "#ECDFD2", color: "#213885" }}
                  >
                    {upcoming.edition} Congress
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "rgba(33,56,133,0.1)", color: "#213885" }}
                  >
                    Registration Opening Soon
                  </span>
                </div>

                <h3
                  className="mb-2"
                  style={{  fontSize: "1.5rem", fontWeight: 700, color: "#081849" }}
                >
                  {upcoming.name}
                </h3>
                <p className="text-xs font-medium mb-5 italic" style={{ color: "#6B7280" }}>
                  Theme: &ldquo;{upcoming.theme}&rdquo;
                </p>

                <div className="flex flex-col gap-2.5 mb-6">
                  <div className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
                    <MapPin size={14} style={{ color: "#213885" }} />
                    <span>{upcoming.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
                    <Calendar size={14} style={{ color: "#213885" }} />
                    <span>{upcoming.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
                    <Clock size={14} style={{ color: "#213885" }} />
                    <span>{upcoming.venue}</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
                  {upcoming.description}
                </p>

                <div className="grid grid-cols-1 gap-2 mb-7">
                  {upcoming.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs" style={{ color: "#374151" }}>
                      <ChevronRight size={12} style={{ color: "#213885" }} />
                      {h}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, #213885 0%, #081849 100%)", boxShadow: "0 4px 16px rgba(33,56,133,0.3)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(33,56,133,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(33,56,133,0.3)";
                    }}
                  >
                    <ExternalLink size={14} />
                    Learn More
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{ backgroundColor: "transparent", color: "#213885", border: "1.5px solid #213885" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#213885";
                      (e.currentTarget as HTMLElement).style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#213885";
                    }}
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
      <section className="py-20" style={{ backgroundColor: "#f9f7f5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full" style={{ backgroundColor: "#CCCACC" }} />
            <h2 style={{  fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#081849" }}>
              Past Conferences
            </h2>
          </div>

          <div className="space-y-4">
            {past.map((conf, index) => (
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
                      style={{ backgroundColor: index === 0 ? "#213885" : "#ECDFD2" }}
                    >
                      <span
                        className="text-xs font-semibold"
                        style={{ color: index === 0 ? "#ECDFD2" : "#6B7280", lineHeight: 1 }}
                      >
                        {conf.edition}
                      </span>
                      <span
                        className="font-bold text-base"
                        style={{ color: index === 0 ? "#ffffff" : "#081849",  lineHeight: 1 }}
                      >
                        {conf.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-bold text-base" style={{ color: "#081849" }}>
                        {conf.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: "#6B7280" }}>
                      <MapPin size={11} />
                      <span>{conf.location}</span>
                    </div>
                    {conf.description && (
                      <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                        {conf.description}
                      </p>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-4 md:gap-2 flex-shrink-0">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-xs" style={{ color: "#6B7280" }}>
                        <Users size={10} />
                        <span className="font-semibold" style={{ color: "#081849" }}>{conf.delegates}</span>
                      </div>
                      <div className="text-xs" style={{ color: "#CCCACC" }}>Delegates</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-xs" style={{ color: "#6B7280" }}>
                        <Globe size={10} />
                        <span className="font-semibold" style={{ color: "#081849" }}>{conf.countries}</span>
                      </div>
                      <div className="text-xs" style={{ color: "#CCCACC" }}>Countries</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-xs" style={{ color: "#6B7280" }}>
                        <Award size={10} />
                        <span className="font-semibold" style={{ color: "#081849" }}>{conf.papers}</span>
                      </div>
                      <div className="text-xs" style={{ color: "#CCCACC" }}>Papers</div>
                    </div>
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
