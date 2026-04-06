import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import ifabLogo from "@/public/iFABlogoforweb.png";

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        backgroundColor: "#ffffff",
        padding: "clamp(120px, 18vw, 100px) clamp(32px, 6vw, 72px) clamp(72px, 10vw, 96px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            width: 64,
            height: 3,
            backgroundColor: "#213885",
            margin: "0 auto 36px",
            borderRadius: 2,
          }}
        />
        <Image
          src={ifabLogo}
          alt="i-FAB logo"
          priority
          style={{
            width: 150,
            height: "auto",
            margin: "0 auto 24px",
          }}
        />
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
          Ankle 
          <br />
          <span style={{ color: "#213885" }}>Biomechanics
          Community
          </span>
        </h1>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 5,
            color: "#213885",
            marginBottom: 28,
          }}
        >
          i - F A B
        </div>
        <p
          style={{
            fontSize: 17,
            color: "#6B7280",
            lineHeight: 1.85,
            maxWidth: 780,
            margin: "0 auto 40px",
          }}
        >
          A global scientific community dedicated to advancing research,
          education, and clinical practice in foot and ankle biomechanics. We bring together biomechanists, engineers, podiatrists, orthopaedic researchers, sports scientists, and industry experts to improve understanding of how the foot and ankle function, and to apply this knowledge in the design and evaluation of footwear, orthoses, insoles, surgical techniques, and computational models.
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
          <Link
            href="/committee"
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
            Our Board <ChevronRight size={16} />
          </Link>
        </div>
        <div
          style={{
            width: 64,
            height: 3,
            backgroundColor: "#213885",
            margin: "44px auto 0",
            borderRadius: 2,
          }}
        />
      </div>
    </section>
  );
}
