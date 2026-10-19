import { useEffect, useState } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function useInView(ref, { threshold = 0.2, once = true } = {}) {
  const [inView, setInView] = useState(reducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && inView)) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, once, inView]);

  return inView;
}

export { reducedMotion };
