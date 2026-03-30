"use client";

/**
 * Hero da página Conferences — mesma estrutura do MissionHero (centrado, Poppins, barra em gradiente).
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const GRADIENT_BAR = "linear-gradient(90deg, #081849 0%, #213885 100%)";
const CAROUSEL_IMAGES = ["/carrossel1.png", "/carrossel2.jpg", "/carrossel3.png",'/carrossel4.png','/carrossel5.jpg', '/carrossel6.jpg', '/carrossel7.jpg', '/carrossel8.jpg'];

export function ConferenceHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="bg-white md:px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28 md:pb-12 md:pt-32 lg:px-8 lg:pb-8 lg:pt-36">
      <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">
        <p className="mb-2 text-[20px] font-semibold uppercase tracking-[0.22em] text-[#213885] md:mb-3">
          World Congresses
        </p>
      </div>

        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">
                    <div className="space-y-6 text-base leading-relaxed text-[#374151] md:text-lg lg:text-[1.125rem]">
                        <p className="mb-5 text-xl font-semibold uppercase tracking-widest text-[#213885]">
                        We have a biannual i-FAB congress to
                        </p>
                        <div className="flex items-start gap-2.5">
                          <ChevronRight className="mt-1.5 h-5 w-5 shrink-0 text-[#213885]" />
                          <p className="m-0">Connect people interested in foot and ankle biomechanics across different sectors</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <ChevronRight className="mt-1.5 h-5 w-5 shrink-0 text-[#213885]" />
                          <p className="m-0">Increase the profile of foot biomechanics in a new territory</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <ChevronRight className="mt-1.5 h-5 w-5 shrink-0 text-[#213885]" />
                          <p className="m-0">Connect with disciplines that might not normally have a strong biomechanics component</p>
                        </div>
                    </div>
                    <div className="relative w-full overflow-hidden rounded-2xl">
                    <div className="relative h-[300px] w-full sm:h-[360px] lg:h-[330px]">
                      {CAROUSEL_IMAGES.map((src, index) => (
                        <Image
                          key={src}
                          src={src}
                          alt="i-FAB congress"
                          fill
                          className={`object-cover transition-opacity duration-700 ${
                            index === activeIndex ? "opacity-100" : "opacity-0"
                          }`}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ))}
                    </div>
                    <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                      {CAROUSEL_IMAGES.map((_, index) => (
                        <span
                          key={index}
                          className={`h-1.5 w-6 rounded-full transition-colors ${
                            index === activeIndex ? "bg-white" : "bg-white/45"
                          }`}
                        />
                      ))}
                    </div>
                    </div>
                </div>  
            </div>
      </section>
      <div
        className="mx-auto  h-[4px] w-16 rounded-sm md:mb-10 md:h-[5px] md:w-20"
        style={{ background: GRADIENT_BAR }}
        aria-hidden
      />
    </section>
  );
}
