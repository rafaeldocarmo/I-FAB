import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        backgroundColor: "#ffffff",
        padding: "clamp(120px, 18vw, 160px) clamp(32px, 6vw, 72px) clamp(72px, 10vw, 96px)",
      }}
    >
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            width: 64,
            height: 3,
            backgroundColor: "#213885",
            margin: "0 auto 36px",
            borderRadius: 2,
          }}
        />
        {/* <div
          style={{
            display: "inline-block",
            border: "1px solid #CCCACC",
            padding: "4px 16px",
            borderRadius: 4,
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase" as const,
            color: "#6B7280",
            marginBottom: 20,
          }}
        >
          Est. 2006 · Bologna, Italy
        </div> */}
        <h1
          style={{
            fontSize: "clamp(2.15rem, 4.5vw, 3.45rem)",
            fontWeight: 700,
            color: "#081849",
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          International Foot and
          <br />
          Ankle Biomechanics
          <br />
          Community
        </h1>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 5,
            color: "#213885",
            textTransform: "uppercase" as const,
            marginBottom: 28,
          }}
        >
          i · F · A · B
        </div>
        <p
          style={{
            fontSize: 17,
            color: "#6B7280",
            lineHeight: 1.85,
            maxWidth: 580,
            margin: "0 auto 40px",
          }}
        >
          A global scientific community dedicated to advancing research,
          education, and clinical practice in foot and ankle biomechanics.
        </p>
        <div
          style={{
            display: "flex",
            gap: 36,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/conferences"
            className="text-[#6B7280] border-b-2 border-transparent hover:text-[#213885] hover:border-[#213885]"
            style={{
              fontSize: 16,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
              paddingBottom: 3,
            }}
          >
            Explore Conferences <ArrowRight size={16} />
          </Link>
          <Link
            href="/mission"
            className="text-[#6B7280] border-b-2 border-transparent hover:text-[#213885] hover:border-[#213885]"
            style={{
              fontSize: 16,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
            }}
          >
            Our Mission <ChevronRight size={16} />
          </Link>
        </div>
        <div
          style={{
            width: 64,
            height: 3,
            backgroundColor: "#CCCACC",
            margin: "44px auto 0",
            borderRadius: 2,
          }}
        />
      </div>
    </section>
  );
}
