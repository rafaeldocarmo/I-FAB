"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Calendar, FileText, Image as ImageIcon, Link2, MapPin } from "lucide-react";
import type { CongressJournalResource, UpcomingConferenceHomeProps } from "@/lib/types";
import { journalResourceButtonLabel } from "@/lib/journalResource";
import { toOrdinal } from "@/lib/ordinal";

/**
 * Homepage next-congress block — data is always from the CMS when `schedule` is set.
 * When there is no future congress, an empty state matches the Conferences page tone.
 */

const NAVY = "#081849";
const BRAND = "#213885";

type Props = {
  schedule: UpcomingConferenceHomeProps | null;
};

function learnMoreListFromSchedule(
  schedule: UpcomingConferenceHomeProps,
): CongressJournalResource[] {
  if (schedule.learnMoreItems && schedule.learnMoreItems.length > 0)
    return schedule.learnMoreItems;
  if (schedule.learnMoreUrl)
    return [
      {
        href: schedule.learnMoreUrl,
        kind: (schedule.learnMoreKind ?? "link") as CongressJournalResource["kind"],
        label: null,
      },
    ];
  return [
    {
      href: "/conferences",
      kind: "link" as const,
      label: null,
    },
  ];
}

function LearnMoreIcon({ kind }: { kind: CongressJournalResource["kind"] }) {
  if (kind === "pdf") return <FileText className="h-4 w-4 shrink-0" aria-hidden />;
  if (kind === "image") return <ImageIcon className="h-4 w-4 shrink-0" aria-hidden />;
  return <Link2 className="h-4 w-4 shrink-0" aria-hidden />;
}

function useCountdown(target: string) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    let intervalId = 0;

    queueMicrotask(() => {
      const end = new Date(target).getTime();
      if (Number.isNaN(end)) {
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      const tick = () => {
        const diff = end - Date.now();
        if (diff <= 0) {
          setTime({ d: 0, h: 0, m: 0, s: 0 });
          return;
        }
        setTime({
          d: Math.floor(diff / 86400000),
          h: Math.floor((diff % 86400000) / 3600000),
          m: Math.floor((diff % 3600000) / 60000),
          s: Math.floor((diff % 60000) / 1000),
        });
      };

      tick();
      intervalId = window.setInterval(tick, 1000);
    });

    return () => clearInterval(intervalId);
  }, [target]);
  return time;
}

function HomeConferenceScheduleEmpty() {
  return (
    <div className="mx-auto w-full max-w-2xl bg-transparent px-6 py-12 sm:px-12 sm:py-14">
      <div
        className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(33,56,133,0.1)" }}
        aria-hidden
      >
        <Calendar className="h-7 w-7 shrink-0" style={{ color: BRAND }} />
      </div>
      <p
        className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em]"
        style={{ color: BRAND }}
      >
        Conferences
      </p>
      <h2
        className="mb-4 text-[clamp(1.25rem,2.2vw,1.65rem)] font-bold leading-snug"
        style={{ color: NAVY }}
      >
        No upcoming congress scheduled yet
      </h2>
      <p className="mx-auto max-w-md text-[15px] leading-relaxed text-[#6B7280]">
        There is no upcoming congress scheduled at the moment. Explore past events on the conferences
        page and join the community to hear when the next World Congress is announced.
      </p>
      <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Link
          href="/conferences"
          className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] px-8 py-3 text-sm font-bold transition-opacity hover:opacity-90 hover:translate-y-[-2px] shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
          style={{ backgroundColor: `#213885`, color: "#ffffff" }}
        >
          View conferences
        </Link>
        <Link
          href="/join"
          className={[
            "inline-flex min-h-[44px] items-center justify-center rounded-[10px] border px-8 py-3 text-sm font-semibold transition-colors hover:translate-y-[-2px] shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
            "hover:bg-white/80",
          ].join(" ")}
          style={{ borderColor: "rgba(33,56,133,0.28)", color: BRAND }}
        >
          Register interest
        </Link>
      </div>
    </div>
  );
}

export function UpcomingConferenceHome({ schedule }: Props) {
  const countdownTarget = schedule?.countdownTarget ?? "";
  const { d, h, m, s } = useCountdown(countdownTarget);

  if (!schedule) {
    return (
      <section
        id="conferences"
        className="px-4 py-14 text-center font-sans sm:px-8 md:px-10 md:py-16"
        style={{ backgroundColor: "#f9f7f5" }}
      >
        <HomeConferenceScheduleEmpty />
      </section>
    );
  }

  const eyebrow =
    typeof schedule.eyebrow === "string" && schedule.eyebrow.trim()
      ? schedule.eyebrow.trim()
      : "Next i-FAB Congress";

  const learnMoreItems = learnMoreListFromSchedule(schedule);
  const units: [number, string][] = [
    [d, "Days"],
    [h, "Hrs"],
    [m, "Min"],
    [s, "Sec"],
  ];

  const learnMoreClassName =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] border px-8 py-3 text-sm font-semibold transition-colors hover:bg-white/70 hover:translate-y-[-2px] shadow-[0_4px_16px_rgba(0,0,0,0.1)]";

  const description =
    typeof schedule.description === "string" && schedule.description.trim()
      ? schedule.description.trim()
      : null;

  return (
    <section
      id="conferences"
      className="px-4 py-14 text-center font-sans sm:px-8 md:px-10 md:py-16"
      style={{ backgroundColor: "#f9f7f5" }}
    >
      <div className="mx-auto max-w-4xl">
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em]"
          style={{ color: BRAND }}
        >
          {eyebrow}
        </p>

        {schedule.editionNumber != null && schedule.editionNumber > 0 ? (
          <p className="mb-3 flex justify-center">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "#ECDFD2", color: NAVY }}
            >
              {toOrdinal(schedule.editionNumber)} World Congress
            </span>
          </p>
        ) : null}

        <h2
          className="mb-6 text-[clamp(1.3rem,2vw,1.8rem)] font-bold leading-tight"
          style={{ color: NAVY }}
        >
          {schedule.name}
        </h2>

        <div className="mx-auto mb-8 flex max-w-lg flex justify-center gap-2.5 text-[13px] text-[#374151] sm:text-sm">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center">
            <Calendar size={16} className="shrink-0 text-[#213885]" aria-hidden />
            <span>{schedule.date}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-center">
            <MapPin size={16} className="shrink-0 text-[#213885]" aria-hidden />
            <span>{schedule.location}</span>
          </div>
          {schedule.venue?.trim() ? (
            <div className="flex flex-wrap items-center justify-center gap-2 text-center">
              <Building2 size={16} className="shrink-0 text-[#213885]" aria-hidden />
              <span>{schedule.venue.trim()}</span>
            </div>
          ) : null}
        </div>

        {description ? (
          <p className="mx-auto mb-9 max-w-2xl text-[13px] leading-relaxed text-[#6B7280] sm:mb-10 sm:text-sm line-clamp-4">
            {description}
          </p>
        ) : null}

        <div className="mb-10 flex flex-wrap justify-center gap-3 sm:gap-3.5 md:mb-11">
          {units.map(([val, lbl]) => (
            <div
              key={lbl}
              className="min-w-[30px] md:min-w-[90px] rounded-2xl border px-4 py-5 backdrop-blur-[8px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.72)",
                borderColor: "rgba(33,56,133,0.14)",
              }}
            >
              <div
                className="font-sans text-[34px] md:text-[42px] font-extrabold leading-none tabular-nums"
                style={{ color: BRAND }}
              >
                {String(val).padStart(2, "0")}
              </div>
              <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B7280]/80">
                {lbl}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/join"
            className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] px-8 py-3 text-sm font-bold transition-opacity hover:opacity-90 hover:translate-y-[-2px] shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            style={{ backgroundColor: `#213885`, color: "#ffffff" }}
          >
            Register Interest
          </Link>
          {learnMoreItems.map((item, idx) => {
            const href = item.href;
            const external = /^https?:\/\//i.test(href);
            const label = journalResourceButtonLabel(item, idx, learnMoreItems.length);
            const btnStyle = {
              borderColor: "rgba(33,56,133,0.28)",
              color: BRAND,
            } as const;
            return external ? (
              <a
                key={`${href}-${idx}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={learnMoreClassName}
                style={btnStyle}
              >
                <LearnMoreIcon kind={item.kind} />
                {label}
              </a>
            ) : (
              <Link key={`${href}-${idx}`} href={href} className={learnMoreClassName} style={btnStyle}>
                <LearnMoreIcon kind={item.kind} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
