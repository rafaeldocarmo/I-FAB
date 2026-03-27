/**
 * Hero mínimo da página Join — apenas título, sem citação nem corpo.
 */

const GRADIENT_BAR = "linear-gradient(90deg, #081849 0%, #213885 100%)";

export function JoinHero() {
  return (
    <section className="bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:pb-12 md:pt-32 lg:px-8 lg:pb-0 lg:pt-36">
      <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">
        <h1 className="text-lg font-semibold uppercase tracking-[0.22em] text-[#213885]">
          JOIN i-FAB
        </h1>
      </div>

      <div
        className="mx-auto mt-[50px] h-[4px] w-16 rounded-sm md:mb-10 md:h-[5px] md:w-20"
        style={{ background: GRADIENT_BAR }}
        aria-hidden
      />
    </section>
  );
}
