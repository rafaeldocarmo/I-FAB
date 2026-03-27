"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Secção home — layout alinhado a UpcomingCountdown (exploration ConferencesSection),
 * fundo claro e paleta i-FAB (sem gradiente azul).
 */

const NAVY = "#081849";
const BRAND = "#213885";
const CREAM = "#ECDFD2";

type UpcomingConferenceHomeProps = {
  name?: string;
  location?: string;
  date?: string;
  venue?: string;
  countdownTarget?: string;
  eyebrow?: string;
};

const defaults = {
  name: "i-FAB World Congress 2026",
  location: "Singapore, Singapore",
  date: "September 14–17, 2026",
  venue: "Suntec Convention Centre",
  countdownTarget: "2026-09-14T09:00:00",
  eyebrow: "Countdown to i-FAB 2026",
};

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
  } as typeof defaults;

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
          <a
            href="#"
            className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] px-8 py-3 text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: `#213885`, color: '#ffffff' }}
          >
            Register Interest
          </a>
          <Link
            href="/conferences"
            className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] border px-8 py-3 text-sm font-semibold transition-colors hover:bg-white/70"
            style={{
              borderColor: "rgba(33,56,133,0.28)",
              color: BRAND,
            }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
