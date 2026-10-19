import { useEffect, useRef, useState } from "react";
import useInView from "../../hooks/useInView";
import Reveal from "../Reveal";

const ICONS = {
  Array: (
    <>
      {[2, 13, 24, 35].map((x) => (
        <rect key={x} x={x} y="9" width="11" height="14" rx="1.5" />
      ))}
    </>
  ),
  String: (
    <>
      {[4, 17, 30].map((x) => (
        <rect key={x} x={x} y="8" width="13" height="16" rx="1.5" />
      ))}
      {["a", "b", "c"].map((c, i) => (
        <text key={c} x={10.5 + i * 13} y="20" fontSize="10" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="monospace">
          {c}
        </text>
      ))}
    </>
  ),
  Stack: (
    <>
      <path d="M10 4 V28 H38 V4" />
      <rect x="14" y="20" width="20" height="5" rx="1" />
      <rect x="14" y="13" width="20" height="5" rx="1" />
      <rect x="14" y="6" width="20" height="5" rx="1" />
    </>
  ),
  Queue: (
    <>
      <path d="M2 7 H46 M2 25 H46" strokeDasharray="3 3" />
      {[8, 20, 32].map((x) => (
        <rect key={x} x={x} y="11" width="9" height="10" rx="1.5" />
      ))}
    </>
  ),
  "Linked List": (
    <>
      {[8, 24, 40].map((x) => (
        <circle key={x} cx={x} cy="16" r="5" />
      ))}
      <path d="M13 16 H18 M16 14 L18 16 L16 18 M29 16 H34 M32 14 L34 16 L32 18" />
    </>
  ),
  Tree: (
    <>
      <path d="M24 8 L13 17 M24 8 L35 17 M13 17 L8 26 M13 17 L18 26 M35 17 L40 26" />
      {[[24, 6], [13, 17], [35, 17], [8, 27], [18, 27], [40, 27]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#020617" />
      ))}
    </>
  ),
  Graph: (
    <>
      <path d="M8 22 L20 8 L36 12 L40 26 L20 24 Z M20 8 L20 24 M8 22 L36 12" />
      {[[8, 22], [20, 8], [36, 12], [40, 26], [20, 24]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#020617" />
      ))}
    </>
  ),
  Recursion: (
    <>
      <rect x="4" y="2" width="40" height="28" rx="3" />
      <rect x="10" y="7" width="28" height="18" rx="2.5" />
      <rect x="16" y="12" width="16" height="8" rx="2" />
    </>
  ),
};

const STOPS = [
  ["Array", "Highlights", "#highlights"],
  ["String", "About me", "#about"],
  ["Stack", "Experience", "#experience"],
  ["Queue", "Education", "#education"],
  ["Linked List", "Projects", "#projects"],
  ["Tree", "Skills", "#skills"],
  ["Graph", "Tech graph", "#graph"],
  ["Recursion", "Contact", "#contact"],
];

const Roadmap = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const [step, setStep] = useState(0);
  const [hover, setHover] = useState(null);
  const active = hover ?? step;

  useEffect(() => {
    if (!inView || hover !== null) return;
    const t = setInterval(() => setStep((s) => (s + 1) % STOPS.length), 1300);
    return () => clearInterval(t);
  }, [inView, hover]);

  return (
    <section aria-label="Page sections" className="relative border-y border-slate-800/80 bg-slate-900/40 py-8 md:py-10">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute left-[6.25%] right-[6.25%] top-[46px] hidden h-0.5 bg-slate-800 lg:block">
            <div
              className="h-full origin-left bg-gradient-to-r from-sky-400 to-violet-500 transition-transform duration-700 ease-out"
              style={{ transform: `scaleX(${active / (STOPS.length - 1)})` }}
            />
          </div>

          <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 lg:gap-2">
            {STOPS.map(([ds, label, href], i) => {
              const on = i === active;
              const done = i < active;
              return (
                <Reveal as="li" key={ds} anim="pop" show={inView} delay={150 + i * 80} duration={450}>
                  <a
                    href={href}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    className={`group flex h-full flex-col items-center rounded-xl border px-2 pb-4 pt-3 text-center transition-all duration-300 ${
                      on
                        ? "-translate-y-1 border-sky-400/70 bg-sky-400/10 shadow-lg shadow-sky-500/20"
                        : "border-slate-800 bg-slate-950/70 hover:border-slate-600"
                    }`}
                  >
                    <span className={`font-mono text-[11px] ${on ? "text-sky-300" : "text-slate-500"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-1.5 flex h-14 w-full items-center justify-center rounded-lg border bg-slate-950 transition-colors duration-300 ${
                        on ? "border-sky-400/50 text-sky-300" : done ? "border-slate-700 text-slate-300" : "border-slate-800 text-slate-500"
                      }`}
                    >
                      <svg viewBox="0 0 48 32" className="h-8 w-12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {ICONS[ds]}
                      </svg>
                    </span>
                    <span className={`mt-3 text-sm font-bold ${on ? "text-white" : "text-slate-200"}`}>{ds}</span>
                    <span className="mt-0.5 text-xs text-slate-500 group-hover:text-slate-400">{label}</span>
                  </a>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
