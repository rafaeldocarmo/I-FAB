"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Link2, Image as ImageIcon } from "lucide-react";
import type { CongressJournalResource, UpcomingConferenceHomeProps } from "@/lib/types";
import {
  journalResourceButtonLabel,
  type JournalKind,
} from "@/lib/journalResource";

/**
 * Secção home — layout alinhado a UpcomingCountdown (exploration ConferencesSection),
 * fundo claro e paleta i-FAB (sem gradiente azul).
 * Dados vêm do CMS via props (servidor) ou defaults abaixo.
 */

const NAVY = "#081849";
const BRAND = "#213885";

const defaults = {
  name: "i-FAB World Congress 2026",
  location: "Singapore, Singapore",
  date: "September 14–17, 2026",
  venue: "Suntec Convention Centre",
  countdownTarget: "2026-09-14T09:00:00",
  eyebrow: "Countdown to i-FAB 2026",
  learnMoreUrl: "/conferences",
  learnMoreKind: "link" satisfies JournalKind,
};

function learnMoreListFromProps(
  props: UpcomingConferenceHomeProps,
): CongressJournalResource[] {
  if (props.learnMoreItems && props.learnMoreItems.length > 0)
    return props.learnMoreItems;
  if (props.learnMoreUrl)
    return [
      {
        href: props.learnMoreUrl,
        kind: (props.learnMoreKind ?? "link") as CongressJournalResource["kind"],
        label: null,
      },
    ];
  return [
    {
      href: defaults.learnMoreUrl,
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
    const calc = () => {
      const diff = new Date(target).getTime() - Date.now();
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
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function cityFromLocation(location: string): string {
  const part = location.split(",")[0]?.trim();
  return part || location;
}

export function UpcomingConferenceHome(props: UpcomingConferenceHomeProps) {
  const data = {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(props).filter(([, v]) => v != null),
    ),
  } as typeof defaults & { learnMoreKind?: JournalKind };

  const learnMoreItems = learnMoreListFromProps(props);

  const { d, h, m, s } = useCountdown(data.countdownTarget);
  const city = cityFromLocation(data.location);
  const headline = `${data.name} · ${city}`;
  const metaLine = `${data.date} · ${data.venue}`;

  const units: [number, string][] = [
    [d, "Days"],
    [h, "Hrs"],
    [m, "Min"],
    [s, "Sec"],
  ];

  const learnMoreClassName =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] border px-8 py-3 text-sm font-semibold transition-colors hover:bg-white/70 hover:translate-y-[-2px] shadow-[0_4px_16px_rgba(0,0,0,0.1)]";

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
          {data.eyebrow}
        </p>

        <h2
          className="mb-2 text-[clamp(1.3rem,2vw,1.8rem)] font-bold leading-tight"
          style={{ color: NAVY }}
        >
          {headline}
        </h2>

        <p className="mb-9 text-[13px] text-[#6B7280] sm:mb-10 sm:text-sm md:mb-11">
          {metaLine}
        </p>

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
            style={{ backgroundColor: `#213885`, color: '#ffffff' }}
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
