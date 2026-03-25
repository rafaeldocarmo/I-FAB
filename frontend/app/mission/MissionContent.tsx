"use client";

import { Globe, Info, Link2, MessageCircle, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

/* Texto institucional — apenas trechos do material fornecido (sem conteúdo inventado). */

/** Parágrafos da secção Mission (o primeiro já aparece como citação no MissionHero). */
const MISSION_PARAGRAPHS = [
  "i-FAB activities seek to enable more effective approaches to researching the foot and ankle, accelerate our ability to address the unique challenges that the foot and ankle pose for biomechanics researchers, health care professionals and industry, and foster seamless activities between researchers and research users.",
  "The International Foot and Ankle Biomechanics Community (i-FAB) is an international collaborative activity which will have an important impact on the foot and ankle biomechanics community. It was launched on July 2nd 2007 at the foot and ankle session of the International Society of Biomechanics (ISB) meeting in Taipei, Taiwan.",
];

const OBJECTIVES_GENERAL = [
  "Providing information on the global activities related to foot and ankle biomechanics",
  "Connecting people working in the foot and ankle biomechanics domain regardless of location and discipline",
  "Facilitating debate on key issues for the community",
  "Creating coordinated community wide activities",
  "Developing a profile for an international critical mass of research activity related to foot and ankle biomechanics",
];

const SPECIFIC_OBJECTIVES = [
  "Increase the profile of foot and ankle biomechanics research within academic, clinical and industry communities",
  "Promote the value of foot and ankle biomechanics research to research users (industry and clinical communities)",
  "Develop a co-ordinated approach to addressing the challenges which experimental and computational biomechanics of the foot and ankle pose",
  "Enable better co-ordination of multidisciplinary research",
  "Enable more effective co-ordination of foot and ankle biomechanics research between groups in different countries",
];

const HOW_WE_DO = [
  "We run a biannual i-FAB congress that is organised to facilitate making connections between different sectors, or increase the profile of foot biomechanics in a new territory. We also try to connect disciplines that traditionally might not have a strong biomechanics component.",
  "We also routinely host and Chair sessions at major international conferences including the Footwear Biomechanics Group, International Society of Biomechanics, World Council of Biomechanics, EFAS, and others too.",
  "This is an open community – if you have an idea for a new initiative that can further our aims please contact us via email",
];

const VALUE_ICONS: LucideIcon[] = [Info, Network, MessageCircle, Link2, Globe];

/** Títulos curtos alinhados ao sentido de cada aim; texto = material original. */
const IFAB_AIMS: { title: string; text: string }[] = [
  {
    title: "Connect across disciplines and regions",
    text: "to connect people working in the foot and ankle biomechanics domain regardless of discipline, sector and location",
  },
  {
    title: "Integrate research",
    text: "to promote integration of research activities",
  },
  {
    title: "Accelerate research",
    text: "to accelerate research developments",
  },
  {
    title: "Community-wide coordination",
    text: "to create coordinated community wide activities",
  },
  {
    title: "International collaboration on challenges",
    text: "to build international activities to address common research challenges.",
  },
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
        </div>
      </section>

      {/* Objetivos gerais (lista) */}
      <section className="bg-[#f9f7f5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-[clamp(1.65rem,2.8vw,2.15rem)] font-bold text-[#081849]">
            What are our objectives?
          </h2>
          <ul className="grid gap-4 md:gap-5">
            {OBJECTIVES_GENERAL.map((item, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-[#CCCACC] bg-white px-6 py-5 text-base leading-relaxed text-[#374151] md:text-lg"
              >
                <span
                  className="mt-2.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: "#213885" }}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Objetivos específicos | Como fazemos — duas colunas */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Texto à esquerda, imagem à direita — alinhamento vertical ao centro em lg */}
          <div className="mb-14 grid grid-cols-1 items-center gap-10 lg:mb-16 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <h2 className="mb-6 text-[clamp(1.45rem,2.2vw,1.9rem)] font-bold text-[#081849]">
                Our specific objectives are to:
              </h2>
              <ol className="list-decimal space-y-5 pl-6 text-base leading-relaxed text-[#374151] marker:text-[#213885] md:text-lg">
                {SPECIFIC_OBJECTIVES.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </ol>
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

          {/* Em lg: imagem à esquerda, texto à direita; no mobile: texto primeiro, imagem abaixo */}
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
