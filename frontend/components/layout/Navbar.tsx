"use client";

/**
 * Nav · mesmo comportamento em todas as páginas (como na home):
 * - No topo: fundo transparente, links escuros, logo principal.
 * - Após scroll: barra azul semitransparente, links claros, logo alternativo.
 */

import {
  useState,
  useEffect,
  useMemo,
  startTransition,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ifabLogo from "@/public/iFABlogoforweb.png";
import ifabLogoPNG from "@/public/logoFooter.png";

const NAV_LINKS = [
  { label: "Mission", href: "/mission" },
  { label: "Committee", href: "/committee" },
  { label: "Conferences", href: "/conferences" },
] as const;

/** Topo da página: fundo claro por baixo do header — texto escuro nos links */
function desktopLinkClass(atTop: boolean, active: boolean): string {
  const base =
    "rounded-md px-2.5 py-1.5 text-[18px] font-medium transition-colors duration-200";
  if (atTop) {
    return active
      ? `${base} bg-[#ECDFD2] font-semibold text-[#213885]`
      : `${base} text-[#374151] hover:bg-[#f9f7f5]`;
  }
  return active
    ? `${base} bg-white/12 font-semibold text-white`
    : `${base} text-white/85 hover:bg-white/10`;
}

function mobileLinkClass(atTop: boolean, active: boolean): string {
  const base = "rounded-lg px-4 py-3 text-sm font-medium";
  if (atTop) {
    return active
      ? `${base} bg-[#ECDFD2] text-[#213885]`
      : `${base} text-[#374151]`;
  }
  return active
    ? `${base} bg-white/12 text-white`
    : `${base} text-white/85`;
}

function NavLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image
        style={{ height: 60, width: "auto" }}
        src={scrolled ? ifabLogoPNG : ifabLogo}
        alt="i-FAB"
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const atTop = !scrolled;

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 20);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 20);
  }, [pathname]);

  useEffect(() => {
    startTransition(() => setMobileOpen(false));
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  const headerStyle = useMemo(
    (): CSSProperties => ({
      height: 80,
      background: scrolled ? "rgba(8, 24, 73, 0.96)" : "transparent",
      boxShadow: scrolled ? "0 4px 24px rgba(8, 24, 73, 0.25)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      backdropFilter: scrolled ? "blur(10px)" : "none",
    }),
    [scrolled],
  );

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow,border-color] duration-300"
      style={headerStyle}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLogo scrolled={scrolled} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={desktopLinkClass(atTop, isActive(item.href))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`rounded-lg p-2 md:hidden ${atTop ? "text-[#213885]" : "text-white/90"}`}
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className={[
            "border-t md:hidden",
            atTop
              ? "border-[#CCCACC] bg-white"
              : "border-white/12 bg-[rgba(8,24,73,0.98)]",
          ].join(" ")}
        >
          <div className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={mobileLinkClass(atTop, isActive(item.href))}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
