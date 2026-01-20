import { Star } from "lucide-react";
import { useMemo } from "react";

export default function MarqueeRow({ items = [], reverse = false }) {
  // Xavfsiz guard
  if (!Array.isArray(items) || items.length === 0) return null;

  // Takrorlashni memo bilan optimallashtiramiz
  const repeatedItems = useMemo(
    () => [...items, ...items, ...items, ...items],
    [items],
  );

  return (
    <div className="py-4 md:py-10 overflow-hidden flex whitespace-nowrap bg-white dark:bg-[#050505] border-y border-zinc-100 dark:border-zinc-900 select-none w-full">
      <div
        className={`flex gap-6 md:gap-20 items-center ${
          reverse ? "animate-scroll-reverse" : "animate-scroll"
        }`}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-6 md:gap-20 group shrink-0"
          >
            <div
              className="text-2xl sm:text-4xl md:text-8xl font-black uppercase italic tracking-tighter 
              text-zinc-900 dark:text-white/20 dark:group-hover:text-[#39B54A] transition-colors duration-500 cursor-default shrink-0"
            >
              {item}
            </div>

            <Star
              className="text-[#39B54A] fill-[#39B54A] shrink-0"
              style={{
                width: "clamp(18px, 4vw, 32px)",
                height: "clamp(18px, 4vw, 32px)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
