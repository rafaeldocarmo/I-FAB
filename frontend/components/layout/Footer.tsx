"use client";

import Link from "next/link";
import { Mail, Globe, MapPin } from "lucide-react";
import Image from "next/image";
import ifabLogo from "@/public/logoFooter.png"

function TwitterIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YoutubeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#081849" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image 
                style={{
                  height: 150,
                  width: "auto"
                }} 
                src={ifabLogo} 
                alt="logo"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs mt-4" style={{ color: "#9ca3af" }}>
              A global scientific community dedicated to advancing research, education, and clinical practice in foot and ankle biomechanics.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <a
                href="mailto:info@i-fab.org"
                className="flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: "#ECDFD2" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ECDFD2")}
              >
                <Mail size={14} />
                info@i-fab.org
              </a>
            </div>
            <div className="flex items-start gap-2 mt-2">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#9ca3af" }} />
              <span className="text-sm" style={{ color: "#9ca3af" }}>
                International Scientific Community — Worldwide
              </span>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: TwitterIcon, href: "#", label: "Twitter" },
                { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
                { icon: YoutubeIcon, href: "#", label: "YouTube" },
                { icon: Globe, href: "#", label: "Website" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#213885";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#ECDFD2" }}>
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "Mission & Objectives", path: "/mission" },
                { label: "Committee", path: "/committee" },
                { label: "Conferences", path: "/conferences" },
                { label: "Join i-FAB", path: "/join" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#ECDFD2" }}>
              Community
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Become a Member", href: "/join" },
                { label: "Submit Abstract", href: "#" },
                { label: "Research Publications", href: "#" },
                { label: "Newsletter", href: "#" },
                { label: "Contact Us", href: "mailto:info@i-fab.org" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#6B7280" }}>
            © {new Date().getFullYear()} International Foot and Ankle Biomechanics Community (i-FAB). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs transition-colors"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#9ca3af")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs transition-colors"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#9ca3af")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
