import { Inter, Poppins } from "next/font/google";

/**
 * Self-hosted at build time by `next/font`, so no request ever leaves for
 * fonts.googleapis.com / fonts.gstatic.com. That matters twice over: a remote
 * `@import` in globals.css was silently dropped by the build (the font never
 * loaded at all), and the CSP in `proxy.ts` allows only `style-src 'self'` /
 * `font-src 'self'`.
 *
 * Poppins ships as static weights, so each one has to be listed. These are the
 * weights the UI actually uses (400/500/600/700/800/900); the single italic in
 * the codebase is left to the browser to synthesise rather than doubling the
 * number of downloaded files.
 */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--ff-poppins",
});

/** Used only by the "What we do" pillars in `MissionContent`. Variable font. */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-inter",
});
