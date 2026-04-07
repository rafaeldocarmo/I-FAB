"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PublicCarouselSlide } from "@/lib/publicCarouselSlides";

/** Ordem aleatória (Fisher–Yates); cópia nova. */
function shuffleSlides<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type PublicImageCarouselProps = {
  slides: PublicCarouselSlide[];
  /** Acessível — ex.: "Congress photo gallery" */
  ariaLabel?: string;
  className?: string;
  /**
   * Se true (default), baralha os slides após montar no cliente (nova ordem em cada visita / refresh).
   * O primeiro render iguala o servidor; em seguida a ordem muda (sem erro de hidratação).
   */
  shuffleSlides?: boolean;
  /**
   * `hero` — autoplay, sem setas, sem bullets, altura fixa (como o antigo ConferenceHero).
   * `default` — setas + bullets, sem autoplay.
   */
  variant?: "default" | "hero";
  /** ms entre slides; em `hero` o default é 3000. Ignorado se ≤ 0. */
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  /**
   * `cover` — preenche o quadro (pode cortar).
   * `contain` — imagem inteira visível, até 100% da largura/altura do quadro, sem distorção; barras com `letterboxBackground`.
   */
  imageFit?: "cover" | "contain";
  /** Cor de fundo atrás da imagem quando `imageFit` é `contain` (formato diferente do quadro). */
  letterboxBackground?: string;
};

const BRAND = "#213885";
const NAVY = "#081849";
const DEFAULT_LETTERBOX_BG = "#E5E7EB";

export function PublicImageCarousel({
  slides,
  ariaLabel = "Image gallery",
  className = "",
  variant = "default",
  autoPlayInterval: autoPlayIntervalProp,
  showArrows: showArrowsProp,
  showDots: showDotsProp,
  shuffleSlides: shuffleSlidesProp = true,
  imageFit = "cover",
  letterboxBackground = DEFAULT_LETTERBOX_BG,
}: PublicImageCarouselProps) {
  const slidesKey = slides.map((s) => s.src).join("\0");
  const slidesRef = useRef(slides);
  useLayoutEffect(() => {
    slidesRef.current = slides;
  });

  const [orderedSlides, setOrderedSlides] = useState<PublicCarouselSlide[]>(slides);

  useEffect(() => {
    const s = slidesRef.current;
    if (!shuffleSlidesProp || s.length <= 1) {
      setOrderedSlides(s);
      return;
    }
    setOrderedSlides(shuffleSlides(s));
  }, [shuffleSlidesProp, slidesKey]);

  const isHero = variant === "hero";
  const autoPlayInterval = useMemo(() => {
    if (autoPlayIntervalProp != null) return autoPlayIntervalProp;
    return isHero ? 3000 : 0;
  }, [autoPlayIntervalProp, isHero]);

  const showArrows =
    showArrowsProp ?? (!isHero && orderedSlides.length > 1 && autoPlayInterval <= 0);
  const showDots = showDotsProp ?? !isHero;
  const needsNavState = showArrows || showDots;

  const enableLoop = orderedSlides.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: enableLoop,
    align: "start",
  });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi || !needsNavState) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi, needsNavState]);

  useEffect(() => {
    if (!emblaApi || !needsNavState) return;

    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    const id = requestAnimationFrame(() => {
      onSelect();
    });

    return () => {
      cancelAnimationFrame(id);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect, needsNavState]);

  useEffect(() => {
    if (!emblaApi || orderedSlides.length <= 1) return;
    if (autoPlayInterval <= 0) return;
    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [emblaApi, orderedSlides.length, autoPlayInterval]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, orderedSlides]);

  if (!orderedSlides.length) return null;

  const frameShadow = "shadow-[0_8px_32px_rgba(8,24,73,0.08)]";
  const frameClass = isHero
    ? `overflow-hidden rounded-2xl ${frameShadow}`
    : `overflow-hidden rounded-2xl border border-[#E8E4E0] bg-[#f9f7f5] ${frameShadow}`;

  const slideImageShellClass = isHero
    ? "relative h-[300px] w-full sm:h-[360px] lg:h-[330px]"
    : "relative aspect-[16/10] w-full md:aspect-[2/1]";
  const imageObjectClass =
    imageFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-live={autoPlayInterval > 0 ? "polite" : undefined}
    >
      <div className={frameClass}>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {orderedSlides.map((slide, i) => (
              <div
                key={slide.src}
                className="min-w-0 shrink-0 grow-0 basis-full"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${orderedSlides.length}`}
              >
                <div
                  className={slideImageShellClass}
                  style={
                    imageFit === "contain"
                      ? { backgroundColor: letterboxBackground }
                      : undefined
                  }
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className={imageObjectClass}
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {orderedSlides.length > 1 && showArrows ? (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 md:px-3">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!enableLoop ? !canPrev : false}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/95 text-[#213885] shadow-md transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-35 md:h-11 md:w-11"
              style={{ color: BRAND }}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!enableLoop ? !canNext : false}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/95 text-[#213885] shadow-md transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-35 md:h-11 md:w-11"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2} aria-hidden />
            </button>
          </div>
        ) : null}

        {orderedSlides.length > 1 && showDots ? (
          <div
            className="flex justify-center gap-2 border-t border-[#E8E4E0] bg-white/90 px-4 py-3"
            role="tablist"
            aria-label="Slide indicators"
          >
            {orderedSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={selected === i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className="h-2.5 rounded-full transition-all duration-200"
                style={{
                  width: selected === i ? 28 : 8,
                  backgroundColor: selected === i ? NAVY : "#CCCACC",
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
