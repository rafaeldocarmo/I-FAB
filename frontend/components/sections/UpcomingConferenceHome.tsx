"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MapPin, Calendar, Lightbulb, CalendarDays } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

/** Azul de destaque da referência visual (badges, ícones, CTA primário) */
const ACCENT = "#2563EB";

type UpcomingConferenceHomeProps = {
  edition?: string;
  name?: string;
  location?: string;
  date?: string;
  abstractInfo?: string;
  description?: string;
  imageUrl?: string;
};

const defaults = {
  edition: "10th",
  name: "i-FAB World Congress 2026",
  location: "Singapore, Singapore",
  date: "September 14–17, 2026",
  abstractInfo: "Abstract submission opens January 2026",
  description:
    "Join thousands of researchers, clinicians, and bioengineers from around the world for the premier congress in foot and ankle biomechanics. Featuring keynote lectures, workshops, and cutting-edge research presentations.",
  imageUrl:
    "https://images.unsplash.com/photo-1768644675720-2f274f84c87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
};

export function UpcomingConferenceHome(props: UpcomingConferenceHomeProps) {
  const data = {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(props).filter(([, v]) => v != null),
    ),
  } as typeof defaults;

  const title = `${data.edition} ${data.name}`;

  const metaRow = (icon: ReactNode, text: string) => (
    <div className="flex items-start gap-3 text-[15px] font-medium leading-snug text-[#4B5563]">
      <span className="mt-0.5 shrink-0" style={{ color: ACCENT }}>
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Imagem + badge (referência: badge no canto superior esquerdo da foto) */}
          <div className="relative w-full px-2 pb-3 pt-1 sm:px-3 sm:pb-4 sm:pt-2">
            <div
              className="relative overflow-hidden rounded-3xl shadow-lg"
            >
              <div
                className="absolute left-4 top-4 z-10 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: ACCENT }}
              >
                UPCOMING EVENT
              </div>
              <div className="aspect-[4/3] w-full min-h-[280px] sm:min-h-[320px] lg:min-h-0 lg:h-[480px]">
                <ImageWithFallback
                  src='/footConference.png'
                  alt="Upcoming i-FAB congress"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight text-[#0f172a] md:mb-4">
              {title}
            </h2>

            <div className="mb-6 flex flex-col gap-3 md:gap-3.5">
              {metaRow(<MapPin size={18} strokeWidth={2} />, data.location)}
              {metaRow(<Calendar size={18} strokeWidth={2} />, data.date)}
              {metaRow(
                <Lightbulb size={18} strokeWidth={2} />,
                data.abstractInfo,
              )}
            </div>

            <p className="mb-8 text-base leading-relaxed text-[#4B5563]">
              {data.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/conferences"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:brightness-105 hover:shadow-md"
                style={{ backgroundColor: ACCENT }}
              >
                <CalendarDays size={18} strokeWidth={2} />
                Learn More
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#0f172a] transition-colors duration-200 hover:bg-[#F9FAFB]"
              >
                Register Interest
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
