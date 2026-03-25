"use client";

import { Mail } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { CommitteeMemberDisplay } from "./page";

type Props = {
  committee: CommitteeMemberDisplay[];
};

/**
 * Secção principal: variação A (Classic Grid) — uma grelha centrada com fotos circulares,
 * sem cartões grandes em duas secções distintas para o comité executivo.
 */
export function CommitteeContent({ committee }: Props) {
  return (
    <>
      {/* Variation A — Classic Grid (Scientific Committee) */}
      <section className="bg-white py-11 sm:py-12 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-10">
            <h2
              className="font-bold text-[#081849]"
              style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
            >
              Meet the Leadership
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 mb-[100px]">
            {committee.map((member) => (
              <div
                key={member.name}
                className="w-[148px] shrink-0 text-center sm:w-[180px]"
              >
                <div
                  className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-2"
                  style={{ borderColor: "#ECDFD2" }}
                >
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="text-sm font-bold leading-tight text-[#081849]">{member.name}</div>
                <div className="mt-1 text-xs font-semibold text-[#213885]">{member.role}</div>
                <div className="mt-0.5 text-xs text-[#6B7280]">{member.affiliation}</div>
                {/* <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-[#CCCACC]">
                  <span aria-hidden>{member.country}</span>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Join CTA */}
      <section style={{ backgroundColor: "#ECDFD2" }} className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4" style={{ fontSize: "1.7rem", fontWeight: 700, color: "#081849" }}>
            Interested in Joining the Committee?
          </h2>
          <p className="mx-auto mb-7 max-w-lg text-sm leading-relaxed" style={{ color: "#374151" }}>
            i-FAB is always seeking dedicated researchers and clinicians to contribute to our global mission. Reach out to learn about involvement opportunities.
          </p>
          <a
            href="mailto:info@i-fab.org"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #213885, #081849)", boxShadow: "0 4px 16px rgba(33,56,133,0.3)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(33,56,133,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(33,56,133,0.3)";
            }}
          >
            <Mail size={14} />
            Contact the Committee
          </a>
        </div>
      </section>
    </>
  );
}
