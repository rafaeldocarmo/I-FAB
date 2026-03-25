import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "i-FAB — International Foot and Ankle Biomechanics Community",
  description:
    "A global scientific community dedicated to advancing research, education, and clinical practice in foot and ankle biomechanics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: "#ffffff" }}>
        <Navbar />
        {/* Variant C nav: transparente sobre o hero — conteúdo começa no topo (padding do hero cobre a barra) */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
