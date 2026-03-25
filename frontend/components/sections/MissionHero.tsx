/**
 * Hero da página Mission — layout centralizado, tipografia Poppins (global).
 * Azul alinhado ao gradiente do CTABanner (barra superior e títulos).
 */

const GRADIENT_BAR = "linear-gradient(90deg, #081849 0%, #213885 100%)";

const PILLARS = [
  { title: "Research", subtitle: "Scientific advancement" },
  { title: "Education", subtitle: "Knowledge transfer" },
  { title: "Community", subtitle: "Global network" },
] as const;

const DEFAULT_QUOTE =
  "To foster international collaboration and advance knowledge in foot and ankle biomechanics through research, education, and community engagement — improving lives through evidence-based understanding.";

const DEFAULT_BODY =
  "Founded in 2006, i-FAB has grown into a global network of over 1,200 members across 30+ countries, united by a shared commitment to understanding the biomechanics of the foot and ankle.";

type MissionHeroProps = {
  quote?: string;
  body?: string;
};

export function MissionHero({
  quote = DEFAULT_QUOTE,
  body = DEFAULT_BODY,
}: MissionHeroProps) {
  return (
    <section className="bg-white px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28 md:pb-12 md:pt-32 lg:px-8 lg:pb-16 lg:pt-36">
      <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">


        <p className="mb-10 text-sm font-semibold uppercase tracking-[0.22em] text-[#213885] md:mb-12 md:text-base">
          Our Mission
        </p>

        <blockquote className="mb-10 px-1 text-[clamp(1.1rem,2.4vw,1.65rem)] font-bold leading-[1.45] text-[#081849] md:mb-12 md:px-4 md:text-[clamp(1.15rem,2.2vw,1.75rem)] lg:leading-[1.4]">
          &ldquo;{quote}&rdquo;
        </blockquote>

        <p className="mx-auto mb-12 max-w-3xl text-base leading-relaxed text-[#6B7280] md:mb-14 md:text-lg lg:mb-16 lg:text-[1.125rem] lg:leading-relaxed">
          {body}
        </p>

        <div
          className="mx-auto mb-12 h-px max-w-3xl md:mb-14 lg:mb-16"
          style={{ backgroundColor: "#E5E7EB" }}
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:gap-10 lg:gap-12">
          {PILLARS.map((col) => (
            <div key={col.title} className="text-center">
              <div className="mb-2 text-lg font-bold text-[#081849] md:text-xl">
                {col.title}
              </div>
              <div className="text-sm text-[#6B7280] md:text-base">{col.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

      <div
          className="mx-auto h-[4px] w-16 rounded-sm md:mb-10 md:h-[5px] md:w-20 mt-[100px]"
          style={{ background: GRADIENT_BAR }}
          aria-hidden
        />
    </section>
  );
}
