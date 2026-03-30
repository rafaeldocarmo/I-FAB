/**
 * Hero da página Board — mesma estrutura do MissionHero (centrado, Poppins, barra em gradiente).
 */

const GRADIENT_BAR = "linear-gradient(90deg, #081849 0%, #213885 100%)";

const DEFAULT_QUOTE =
  "Our board is composed of internationally recognized experts who guide the scientific direction, governance, and activities of i-FAB.";

type CommitteeHeroProps = {
  /** Rótulo superior (ex.: Scientific Board) */
  eyebrow?: string;
  quote?: string;
  /** Parágrafo de apoio opcional abaixo da citação */
  body?: string;
};

export function CommitteeHero({
  eyebrow = "Scientific Board",
  quote = DEFAULT_QUOTE,
  body,
}: CommitteeHeroProps) {
  return (
    <section className="bg-white px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28 md:pb-12 md:pt-32 lg:px-8 lg:pb-16 lg:pt-36">
      <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">
        <p className="mb-10 text-sm font-semibold uppercase tracking-[0.22em] text-[#213885] md:mb-12 md:text-base">
          {eyebrow}
        </p>

        <blockquote className="mb-10 px-1 text-[clamp(1.1rem,2.4vw,1.65rem)] font-bold leading-[1.45] text-[#081849] md:mb-12 md:px-4 md:text-[clamp(1.15rem,2.2vw,1.75rem)] lg:leading-[1.4]">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {body ? (
          <p className="mx-auto mb-12 max-w-3xl text-base leading-relaxed text-[#6B7280] md:mb-14 md:text-lg lg:mb-16 lg:text-[1.125rem] lg:leading-relaxed">
            {body}
          </p>
        ) : null}
      
      </div>

      <div
        className="mx-auto mt-[100px] h-[4px] w-16 rounded-sm md:mb-10 md:h-[5px] md:w-20"
        style={{ background: GRADIENT_BAR }}
        aria-hidden
      />
    </section>
  );
}
