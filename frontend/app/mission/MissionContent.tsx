"use client";

import Image from "next/image";

/* Texto institucional — material acordado (sem conteúdo inventado). */

/** Parágrafos iniciais da secção Mission (a citação do hero vem de mission/page.tsx). */
const MISSION_PARAGRAPHS = [
  "i-FAB activities seek to enable more effective approaches to researching the foot and ankle, accelerate our ability to address the unique challenges that the foot and ankle pose for biomechanics researchers, health care professionals and industry, and foster seamless activities between researchers and research users.",
  "The International Foot and Ankle Biomechanics Community (i-FAB) is an international collaborative activity which will have an important impact on the foot and ankle biomechanics community. It was launched on July 2nd 2007 at the foot and ankle session of the International Society of Biomechanics (ISB) meeting in Taipei, Taiwan.",
];

const THE_FOOT_BODY =
  "The foot and ankle represent one of the most complex mechanical structures in the human body, consisting of multiple joints, bones, muscles, tendons, and ligaments that work together to support locomotion. Understanding this system requires advanced experimental biomechanics, computational modeling, and engineering approaches.";

const SCIENTIFIC_VALUE_INTRO =
  "A central mission of i-FAB is to promote the scientific value of biomechanics research. By bridging the gap between laboratory findings and applied solutions, i-FAB ensures that:";

const SCIENTIFIC_VALUE_BULLETS = [
  "Footwear and orthotics industries integrate research-based designs.",
  "Motion capture and modeling technologies are applied to sports and performance analysis.",
  "Engineering and biomechanics inform next-generation implants and materials.",
];

const SCIENTIFIC_VALUE_OUTRO =
  "This close connection between science and application positions i-FAB as a leading force in the field.";

const SECTION_TITLE_WHAT_WE_DO = "What we do";

type ObjectivePillar = {
  id: number;
  color: string;
  lead: string;
  body: string;
};

/**
 * Pilares operacionais + objetivos estratégicos (layout numerado em colunas).
 */
const OBJECTIVES_PILLARS: ObjectivePillar[] = [
  {
    id: 1,
    color: "#213885",
    lead: "Raising visibility",
    body:
      "By showcasing biomechanics at international congresses, conferences, and collaborative events, we ensure that foot and ankle research gains recognition across disciplines, and we increase visibility of biomechanics research in academic, clinical, and industrial communities.",
  },
  {
    id: 2,
    color: "#081849",
    lead: "Bridging academia and industry",
    body:
      "i-FAB provides a platform where universities, sports science labs, orthopaedic engineers, and footwear companies can exchange knowledge. We promote the scientific value of foot and ankle biomechanics to research users, including footwear designers, orthotics manufacturers, sports performance experts, and surgical innovators.",
  },
  {
    id: 3,
    color: "#2c5282",
    lead: "Encouraging multidisciplinary collaboration and coordinating research",
    body:
      "We actively connect biomechanists, engineers, podiatrists, orthopaedic specialists, and computational modelers, ensuring new discoveries have maximum reach. We coordinate international research to address the complex challenges of experimental and computational biomechanics, and encourage collaboration between biomechanics, engineering, podiatry, orthopaedics, sports science, and industry.",
  },
  {
    id: 4,
    color: "#1a365d",
    lead: "Providing global networking opportunities",
    body:
      "Through the biannual i-FAB Congress and partnerships with major biomechanics societies, we amplify the scientific importance of foot and ankle research worldwide.",
  },
];

function ObjectivesNumberedPillars() {
  const objectives = OBJECTIVES_PILLARS;

  return (
    <div
      className="bg-white px-4 py-10 sm:px-8 sm:py-12 md:px-12 md:py-[52px] rounded-2xl"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="mb-11 flex flex-wrap items-end gap-5">
        <h2
          className="m-0 text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold leading-tight text-[#081849]"
        >
          {SECTION_TITLE_WHAT_WE_DO}
        </h2>
        <div className="h-px min-w-[40px] flex-1 bg-[#ECDFD2]" />
      </div>

      <div className="grid grid-cols-1 divide-y divide-[#ECDFD2] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {objectives.map((obj) => (
          <div key={obj.id} className="py-10 first:pt-0 last:pb-0 lg:px-7 lg:py-0 lg:first:pl-0 lg:last:pr-0">
            <div
              className="mb-3 text-[52px] font-black leading-none opacity-[0.15]"
              style={{ color: obj.color }}
            >
              {String(obj.id).padStart(2, "0")}
            </div>

            <div
              className="mb-3.5 h-[3px] w-8 rounded-sm"
              style={{ backgroundColor: obj.color }}
            />

            <div className="mb-3 text-[13px] font-bold leading-snug text-[#081849]">{obj.lead}</div>

            <p className="m-0 text-[13px] leading-[1.75] text-[#6B7280]">{obj.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const HOW_WE_DO = [
  "One of the core initiatives of i-FAB is its biannual congress, an international meeting designed to showcase cutting-edge biomechanics research; build bridges between academia, industry, and applied practice; foster connections between disciplines that traditionally might not intersect; and highlight biomechanics in new regions and territories.",
  "Beyond its congress, i-FAB also organizes and contributes to sessions at major international conferences such as the Footwear Biomechanics Group, International Society of Biomechanics, World Council of Biomechanics, and EFAS.",
  "This is an open community – if you have an idea for a new initiative that can further our aims please contact us via email",
];

export function MissionContent() {
  return (
    <>
      {/* Missão + imagem */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-2xl font-semibold uppercase tracking-widest text-[#213885]">
            Mission
          </p>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-6 text-base leading-relaxed text-[#374151] md:text-lg lg:text-[1.125rem]">
              {MISSION_PARAGRAPHS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl">
              <Image
                src="/mission1.png"
                alt="i-FAB mission"
                width={1200}
                height={900}
                className="h-auto w-full max-h-[min(520px,70vh)] object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <p className="mb-5 text-2xl font-semibold uppercase tracking-widest text-[#213885] mt-20">
            Promoting the Scientific Value of Biomechanics
          </p>
          <p className="mb-3">{SCIENTIFIC_VALUE_INTRO}</p>
          <ul className="list-disc space-y-3 pl-6 marker:text-[#213885] mb-5">
            {SCIENTIFIC_VALUE_BULLETS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{SCIENTIFIC_VALUE_OUTRO}</p>
        </div>
      </section>

      {/* Pilares / o que fazemos (lista numerada) */}
      <section className=" py-16 sm:py-20" style={{ background: "linear-gradient(135deg,rgb(24, 49, 124) 0%,rgb(36, 60, 141) 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ObjectivesNumberedPillars />
        </div>
      </section>

      {/* THE FOOT + imagem | Como fazemos + modelo */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 grid grid-cols-1 items-center gap-10 lg:mb-16 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0 space-y-6 text-base leading-relaxed text-[#374151] md:text-lg">
              <h2 className="text-[clamp(1.45rem,2.2vw,1.9rem)] font-bold text-[#081849]">
                THE FOOT
              </h2>
              <p>{THE_FOOT_BODY}</p>
            </div>
            <div className="relative w-full min-w-0 overflow-hidden rounded-2xl lg:self-center">
              <Image
                src="/Foot.jpg"
                alt="Foot"
                width={1200}
                height={900}
                className="h-auto w-full max-h-[min(420px,55vh)] object-cover object-center lg:max-h-[min(480px,65vh)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 w-full min-w-0 overflow-hidden rounded-2xl lg:order-1 lg:self-center">
              <Image
                src="/FootModel.jpg"
                alt="Foot model"
                width={1200}
                height={900}
                className="h-auto w-full max-h-[min(420px,55vh)] object-cover object-center lg:max-h-[min(480px,65vh)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 min-w-0 lg:order-2">
              <h2 className="mb-6 text-[clamp(1.45rem,2.2vw,1.9rem)] font-bold text-[#081849]">
                How do we do this?
              </h2>
              <div className="space-y-6 text-base leading-relaxed text-[#374151] md:text-lg">
                {HOW_WE_DO.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10 bg-white" aria-hidden />
    </>
  );
}
