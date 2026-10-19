import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { heroSlides } from "../../data/heroSlides";
import { cn } from "../../lib/utils";

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    // Auto-play every 5 seconds
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(autoplay);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Embla Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
              <div className="aspect-[1590/670] w-full">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Desktop Pagination (Vertical with Numbers) */}
      <div className="absolute left-8 top-1/2 hidden -translate-y-1/2 flex-col items-start gap-4 md:flex">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className="group flex items-center gap-3"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={cn(
                "font-cata text-[16px] font-semibold transition-colors duration-300",
                selected === index ? "text-ink" : "text-soft group-hover:text-ink"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "block h-[2px] transition-all duration-300 ease-in-out",
                selected === index
                  ? "w-[69px] bg-ink"
                  : "w-[22px] bg-soft group-hover:bg-ink"
              )}
            />
          </button>
        ))}
      </div>

      {/* Custom Mobile Pagination (Dots) */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-transform duration-300",
              selected === index
                ? "scale-100 bg-ink"
                : "scale-75 bg-ink/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}