import type { LucideIcon } from "lucide-react";

type PageHeroProps = {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
};

export function PageHero({ icon: Icon, badge, title, description }: PageHeroProps) {
  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(135deg, #081849 0%, #213885 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
            style={{
              backgroundColor: "rgba(236,223,210,0.15)",
              color: "#ECDFD2",
              border: "1px solid rgba(236,223,210,0.25)",
            }}
          >
            <Icon size={11} />
            {badge}
          </div>
          <h1
            className="text-white mb-5"
            style={{
              
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <p
            className="text-base leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
