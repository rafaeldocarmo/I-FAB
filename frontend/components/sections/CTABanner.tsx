"use client";

import { BookOpen } from "lucide-react";

export function CTABanner() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,rgb(15, 40, 116) 0%, #213885  100%)" }}
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BookOpen size={36} className="mx-auto mb-4 opacity-60 text-white" />
        <h2
          className="mb-4 text-white"
          style={{
            
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 700,
          }}
        >
          Join the Global i-FAB Community
        </h2>
        <p
          className="mb-8 text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Connect with leading researchers and clinicians worldwide. Stay updated on the latest advances in foot and ankle biomechanics.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:info@i-fab.org"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: "#fff", color: "#081849" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Get in Touch
          </a>
          <a
            href="mailto:info@i-fab.org"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Browse Resources
          </a>
        </div>
      </div>
    </section>
  );
}
