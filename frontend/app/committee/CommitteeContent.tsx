"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { ContactBoardModal } from "@/components/committee/ContactBoardModal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { CommitteeMemberDisplay } from "./page";

type Props = {
  committee: CommitteeMemberDisplay[];
};

/**
 * Secção principal: variação A (Classic Grid) + variação E (cartões com overlay ao hover/focus).
 */
export function CommitteeContent({ committee }: Props) {
  const [contactBoardOpen, setContactBoardOpen] = useState(false);

  return (
    <>
      {/* Variation A — Classic Grid (Scientific Board) */}
      {/* <section className="bg-[#f9f7f5] py-11 sm:py-12 md:py-14">
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
                className="w-[298px] shrink-0 text-center sm:w-[180px]"
              >
                <div
                  className="mx-auto mb-3 h-30 w-30 overflow-hidden rounded-full border-1" style={{ borderColor: "rgba(22, 65, 193, 0.74)" }}
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
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-[#CCCACC]">
                  <span aria-hidden>{member.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Variation E — Hover cards (exploration BoardHoverCards) */}
      <section className="bg-[#f9f7f5] py-11 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-10">
            <h2
              className="font-bold text-[#081849]"
              style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
            >
              Hover to meet the board
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {committee.map((member, index) => (
              <div
                key={`${member.name}-${member.role}-${index}`}
                role="article"
                tabIndex={0}
                className="group relative min-h-[220px] w-[220px] cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent bg-white shadow-[0_2px_10px_rgba(8,24,73,0.06)] transition-all duration-250 hover:-translate-y-1 hover:border-[#213885] hover:shadow-[0_12px_32px_rgba(33,56,133,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#213885] focus-within:-translate-y-1 focus-within:border-[#213885] focus-within:shadow-[0_12px_32px_rgba(33,56,133,0.18)]"
              >
                <div className="h-[200px] overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-[filter] duration-250 group-hover:brightness-[0.8] group-focus-within:brightness-[0.8]"
                  />
                </div>
                <div className="p-3.5 font-sans">
                  <div className="text-[13px] font-bold text-[#081849]">{member.name}</div>
                  <div className="mt-0.5 text-[11px] text-[#6B7280]">{member.affiliation}</div>
                </div>
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-center bg-[rgba(8,24,73,0.93)] p-2 font-sans opacity-0 transition-opacity duration-250 group-hover:opacity-100 group-focus-within:opacity-100">
                  <div className="mb-1 text-sm font-bold text-white">{member.name}</div>
                  <div className="mb-2.5 text-xs font-semibold text-[#ECDFD2]">{member.role}</div>
                  {member.secondaryRole ? (
                    <div className="mb-2 text-[11px] font-medium text-[#ECDFD2]/90">
                      {member.secondaryRole}
                    </div>
                  ) : null}
                  {member.additionalInfo ? (
                  <p className="mb-3.5 text-xs leading-relaxed text-white/70">
                      {member.additionalInfo}
                    </p>
                  ) : null}
                  <div className="text-[11px] text-white/50">
                    {member.affiliation}
                    {member.country ? ` · ${member.country}` : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section  className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4" style={{ fontSize: "1.7rem", fontWeight: 700, color: "#081849" }}>
            Interested in Joining the Board?
          </h2>
          <p className="mx-auto mb-7 max-w-lg text-sm leading-relaxed" style={{ color: "#374151" }}>
            i-FAB is always seeking dedicated researchers and clinicians to contribute to our global mission. Reach out to learn about opportunities to join the board.
          </p>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #213885, #081849)", boxShadow: "0 4px 16px rgba(33,56,133,0.3)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(33,56,133,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(33,56,133,0.3)";
            }}
            onClick={() => setContactBoardOpen(true)}
          >
            <Mail size={14} aria-hidden />
            Contact the Board
          </button>
        </div>
      </section>

      <ContactBoardModal
        open={contactBoardOpen}
        onClose={() => setContactBoardOpen(false)}
      />
    </>
  );
}
