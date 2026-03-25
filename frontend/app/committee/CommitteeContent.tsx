"use client";

import { Mail, Globe } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { CommitteeMemberDisplay } from "./page";

type AdvisoryMember = {
  name: string;
  affiliation: string;
  country: string;
};

type Props = {
  committee: CommitteeMemberDisplay[];
  advisoryBoard: AdvisoryMember[];
};

export function CommitteeContent({ committee, advisoryBoard }: Props) {
  return (
    <>
      {/* Executive Committee */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#213885" }}>
              Leadership
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#081849" }}>
              Executive Committee
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committee.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl overflow-hidden transition-all duration-300"
                style={{ backgroundColor: "#ffffff", border: "1px solid #CCCACC", boxShadow: "0 2px 12px rgba(8,24,73,0.05)" }}
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
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(8,24,73,0.6) 0%, transparent 60%)" }}
                  />
                  <div className="absolute top-3 right-3 text-xl">{member.country}</div>
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "#213885", color: "#ffffff" }}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="mb-1 font-bold" style={{ fontSize: "1rem", color: "#081849" }}>
                    {member.name}
                  </h3>
                  <p className="text-xs mb-4" style={{ color: "#6B7280" }}>
                    {member.affiliation}
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href={member.email}
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: "#ECDFD2", color: "#213885" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#213885";
                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#ECDFD2";
                        (e.currentTarget as HTMLElement).style.color = "#213885";
                      }}
                    >
                      <Mail size={11} />
                      Contact
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: "#f9f7f5", color: "#6B7280", border: "1px solid #CCCACC" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#ECDFD2";
                        (e.currentTarget as HTMLElement).style.color = "#213885";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#f9f7f5";
                        (e.currentTarget as HTMLElement).style.color = "#6B7280";
                      }}
                    >
                      <Globe size={11} />
                      Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px" style={{ backgroundColor: "#CCCACC" }} />
      </div>

      {/* Advisory Board */}
      <section className="py-20" style={{ backgroundColor: "#f9f7f5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#213885" }}>
              Global Expertise
            </p>
            <h2
              className="mb-3"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#081849" }}
            >
              Advisory Board
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "#6B7280" }}>
              Distinguished researchers and clinicians who provide strategic guidance and scientific oversight to the community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {advisoryBoard.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl p-5 transition-all duration-200"
                style={{ backgroundColor: "#ffffff", border: "1px solid #CCCACC" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#213885";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(33,56,133,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#CCCACC";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-base"
                    style={{ backgroundColor: "#ECDFD2" }}
                  >
                    {member.country}
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight" style={{ color: "#081849" }}>{member.name}</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{member.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section style={{ backgroundColor: "#ECDFD2" }} className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4" style={{ fontSize: "1.7rem", fontWeight: 700, color: "#081849" }}>
            Interested in Joining the Committee?
          </h2>
          <p className="text-sm leading-relaxed mb-7 max-w-lg mx-auto" style={{ color: "#374151" }}>
            i-FAB is always seeking dedicated researchers and clinicians to contribute to our global mission. Reach out to learn about involvement opportunities.
          </p>
          <a
            href="mailto:info@i-fab.org"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
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
