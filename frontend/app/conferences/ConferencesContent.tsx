"use client";

import Link from "next/link";
import { Calendar, MapPin, Link2, FileText, ImageIcon } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { toOrdinal } from "@/lib/ordinal";
import type { UpcomingConferenceData, PastConferenceData } from "./page";
import type { CongressJournalResource } from "@/lib/types";
import { journalResourceButtonLabel } from "@/lib/journalResource";

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function JournalKindGlyph({ kind }: { kind: CongressJournalResource["kind"] }) {
  if (kind === "pdf") return <FileText size={14} aria-hidden />;
  if (kind === "image") return <ImageIcon size={14} aria-hidden />;
  return <Link2 size={14} aria-hidden />;
}

function JournalKindGlyphLarge({ kind }: { kind: CongressJournalResource["kind"] }) {
  if (kind === "pdf") return <FileText className="h-8 w-8" strokeWidth={1.75} aria-hidden />;
  if (kind === "image") return <ImageIcon className="h-8 w-8" strokeWidth={1.75} aria-hidden />;
  return <Link2 className="h-8 w-8" strokeWidth={1.75} aria-hidden />;
}

type Props = {
  upcoming: UpcomingConferenceData | null;
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
            {upcoming ? (
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold ml-2"
                style={{ backgroundColor: "#213885", color: "#ffffff" }}
              >
                Next Event
              </span>
            ) : null}
          </div>

          {upcoming ? (
            <div
              className="overflow-hidden rounded-3xl md:shadow-[0_12px_48px_rgba(8,24,73,0.45)]"
              style={{
                background: "linear-gradient(145deg, #081849 0%, #213885 48%,rgb(27, 57, 141) 100%)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 min-h-64 lg:min-h-[320px] lg:h-auto">
                  {upcoming.image ? (
                    <ImageWithFallback
                      src={upcoming.image}
                      alt={upcoming.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="h-full min-h-64 w-full bg-gradient-to-br from-[#081849] via-[#213885] to-[#1e3a8a]"
                      aria-hidden
                    />
                  )}
                  {upcoming.edition != null ? (
                    <div className="absolute bottom-6 left-6">
                      <div className="text-5xl font-bold text-[#213885]">
                        {toOrdinal(upcoming.edition)}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-[#213885]">
                        Edition
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-white/10 p-8 lg:border-l lg:border-t-0 lg:p-10">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#ECDFD2] px-2.5 py-1 text-xs font-semibold text-[#081849]">
                      {upcoming.edition != null
                        ? `${toOrdinal(upcoming.edition)} Congress`
                        : "Congress"}
                    </span>
                  </div>

                  <h3
                    className={`text-[1.5rem] font-bold text-white ${upcoming.theme.trim() ? "mb-2" : "mb-5"}`}
                  >
                    {upcoming.name}
                  </h3>
                  {upcoming.theme.trim() ? (
                    <p className="mb-5 text-xs font-medium italic text-[#ECDFD2]/90">
                      Theme: &ldquo;{upcoming.theme}&rdquo;
                    </p>
                  ) : null}

                  <div className="mb-6 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <MapPin size={14} className="shrink-0 text-[#ECDFD2]" />
                      <span>{upcoming.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <Calendar size={14} className="shrink-0 text-[#ECDFD2]" />
                      <span>{upcoming.date}</span>
                    </div>
                  </div>

                  {upcoming.description.trim() ? (
                    <p className="mb-6 text-sm leading-relaxed text-white/75">{upcoming.description}</p>
                  ) : null}

                  <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
                    {(upcoming.journalResources.length > 0
                      ? upcoming.journalResources
                      : [{ href: "/conferences", kind: "link" as const, label: null }]
                    ).map((item, idx, arr) => {
                      const label = journalResourceButtonLabel(item, idx, arr.length);
                      const ext = isExternalHref(item.href);
                      const className =
                        "inline-flex items-center justify-center gap-2 rounded-xl bg-[#ECDFD2] px-6 py-3 text-sm font-semibold text-[#081849] shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]";
                      return ext ? (
                        <a
                          key={`${item.href}-${idx}`}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={className}
                        >
                          <JournalKindGlyph kind={item.kind} />
                          {label}
                        </a>
                      ) : (
                        <Link key={`${item.href}-${idx}`} href={item.href} className={className}>
                          <JournalKindGlyph kind={item.kind} />
                          {label}
                        </Link>
                      );
                    })}
                    <Link
                      href="/join"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-white/80 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                    >
                      Register Interest
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E8E4E0] bg-[#f9f7f5] px-6 py-14 text-center sm:px-10">
              <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-[#6B7280]">
                There is no upcoming congress scheduled at the moment. Join the community to hear about
                future i-FAB events.
              </p>
              <Link
                href="/join"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#213885] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Join i-FAB
              </Link>
            </div>
          )}
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
            {past.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[#CCCACC] bg-[#fafaf9] px-6 py-12 text-center text-[15px] text-[#6B7280]">
                No past conferences listed yet.
              </p>
            ) : null}
            {past.map((conf) => {
              const journalBlock =
                conf.journalResources.length > 0 ? (
                  <div className="-ml-1 flex shrink-0 flex-wrap items-center gap-1 self-start md:ml-0 md:self-auto">
                    {conf.journalResources.map((item, idx) => {
                      const aria =
                        item.kind === "pdf"
                          ? `Download PDF for ${conf.name}${item.label ? `: ${item.label}` : ""}`
                          : item.kind === "image"
                            ? `Open image for ${conf.name}${item.label ? `: ${item.label}` : ""}`
                            : `Open link for ${conf.name}${item.label ? `: ${item.label}` : ""}`;
                      return (
                        <a
                          key={`${item.href}-${idx}`}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={item.label?.trim() || undefined}
                          className="rounded-lg p-2 text-[#213885] transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#213885]"
                          aria-label={aria}
                        >
                          <JournalKindGlyphLarge kind={item.kind} />
                        </a>
                      );
                    })}
                  </div>
                ) : null;

              return (
                <div
                  key={`${conf.year}-${conf.name}`}
                  className="group flex flex-col  overflow-hidden rounded-2xl border border-[#CCCACC] bg-white transition-all duration-200 hover:border-[#213885] hover:shadow-[0_4px_20px_rgba(33,56,133,0.10)] md:flex-row md:items-center"
                >
                  <div className="flex shrink-0 justify-center p-5 pb-0 md:justify-start md:p-6 md:pb-6 md:pr-3 w-full max-w-[360px]">
                    <div
                      className={`flex h-[120px] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-xl ${
                        conf.image ? "transparent" : "bg-[#213885]"
                      }`}
                    >
                      {conf.image ? (
                        <ImageWithFallback
                          src={conf.image}
                          alt={conf.imageAlt}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span
                          className="px-4 text-center text-2xl font-bold tabular-nums tracking-tight"
                          style={{ color: "#ECDFD2" }}
                        >
                          {conf.year}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between md:gap-6 md:p-6 md:pl-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold" style={{ color: "#081849" }}>
                        {conf.name}
                      </h3>
                      <div className="mt-0.5 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6B7280" }}>
                          <MapPin size={11} className="shrink-0 text-[#213885]" />
                          <span>{conf.location}</span>
                        </div>
                        {conf.dateLine !== "—" ? (
                          <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6B7280" }}>
                            <Calendar size={11} className="shrink-0 text-[#213885]" />
                            <span>{conf.dateLine}</span>
                          </div>
                        ) : null}
                      </div>
                      {conf.description ? (
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                          {conf.description}
                        </p>
                      ) : null}
                    </div>
                    {journalBlock}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(145deg, #081849 0%, #213885 48%,rgb(27, 57, 141) 100%)" }}
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
