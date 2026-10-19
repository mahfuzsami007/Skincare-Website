import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center bg-black text-white transition-all duration-300 hover:bg-gray-800",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ChevronUp size={20} strokeWidth={2} />
    </button>
  );
}