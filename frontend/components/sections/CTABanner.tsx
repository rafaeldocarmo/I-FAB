"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export function CTABanner() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,rgb(24, 49, 124) 0%,rgb(36, 60, 141) 100%)" }}
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
          Connect with researchers, clinicians, and industry partners worldwide. Join a network that amplifies foot and ankle biomechanics through the biannual i-FAB Congress and global collaboration.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/join"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:translate-y-[-2px]"
            style={{ backgroundColor: "#fff", color: "#081849" }}
          >
            Get in Touch 
          </Link>
        </div>
      </div>
    </section>
  );
}
