/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { FiClock, FiCloud, FiLayers, FiZap } from "react-icons/fi";
import { FaChessKnight, FaNodeJs } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import { highlights } from "../../data/portfolio";
import useInView, { reducedMotion } from "../../hooks/useInView";
import Reveal from "../Reveal";
import { Kw, Num, Section, SectionHeading, Str } from "../ui";

const ICONS = {
  experience: FiClock,
  springboot: SiSpringboot,
  nodejs: FaNodeJs,
  performance: FiZap,
  devops: FiCloud,
  chess: FaChessKnight,
};
const Bracket = ({ side }) => (
  <div aria-hidden="true" className="hidden w-4 shrink-0 flex-col lg:flex">
    <span className="invisible mb-1.5 font-mono text-[11px]">0</span>
    <div
      className={`flex-1 border-y-[3px] border-slate-500 ${
        side === "left" ? "rounded-l-md border-l-[3px]" : "rounded-r-md border-r-[3px]"
      }`}
    />
    <span className="invisible mt-2 font-mono text-sm">0</span>
    <span className="h-8" />
  </div>
);

const addr = (i) => `0x${(0x1000 + i * 4).toString(16).toUpperCase()}`;

const CountUp = ({ value, start, delay = 0 }) => {
  const m = String(value).match(/^([\d.]+)(.*)$/);
  const target = m ? parseFloat(m[1]) : null;
  const decimals = m ? (m[1].split(".")[1] || "").length : 0;
  const [n, setN] = useState(() => (target === null || reducedMotion() ? target : 0));

  useEffect(() => {
    if (!start || target === null || reducedMotion()) return;
    let raf;
    const t0 = performance.now() + delay;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - t0) / 1200));
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, delay]);

  if (target === null) return value;
  return (
    <>
      {n.toFixed(decimals)}
      {m[2]}
    </>
  );
};

const Highlights = () => {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { threshold: 0.1 });
  const scrollerRef = useRef(null);
  const touchedAt = useRef(0);
  const [cursor, setCursor] = useState(0);
  const [hover, setHover] = useState(null);
  const n = highlights.length;
  const i = hover ?? cursor;

  useEffect(() => {
    if (!inView || hover !== null) return;
    const t = setInterval(() => setCursor((c) => (c + 1) % n), 2200);
    return () => clearInterval(t);
  }, [inView, hover, n]);

  useEffect(() => {
    const box = scrollerRef.current;
    const cell = gridRef.current?.children[cursor];
    if (!box || !cell || box.scrollWidth <= box.clientWidth || hover !== null) return;
    if (Date.now() - touchedAt.current < 6000) return;
    box.scrollTo({ left: cell.offsetLeft - 16, behavior: "smooth" });
  }, [cursor, hover]);

  return (
    <Section id="highlights">
      <SectionHeading
        title="Highlights"
        code={
          <>
            <Kw>const</Kw> highlights = <Kw>new</Kw> Array(<Num>{n}</Num>);
          </>
        }
      />

      <p className="mb-5 min-w-0 truncate font-mono text-sm text-slate-400">
        <span className="rounded bg-sky-400/15 px-2 py-0.5 text-sky-300">i = {i}</span>{" "}
        highlights[{i}].title → <Str>&quot;{highlights[i].title}&quot;</Str>
      </p>

      <div className="flex items-stretch gap-2 lg:gap-3">
        <Bracket side="left" />

        <div
          ref={scrollerRef}
          onTouchStart={() => (touchedAt.current = Date.now())}
          onWheel={() => (touchedAt.current = Date.now())}
          className="-mx-4 min-w-0 flex-1 snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
        >
          <ol ref={gridRef} className="flex w-max lg:w-full">
            {highlights.map((h, idx) => {
              const active = idx === i;
              const first = idx === 0;
              const last = idx === n - 1;
              const Icon = ICONS[h.kind] || FiLayers;
              const numeric = /^[\d.]/.test(h.value);
              return (
                <Reveal
                  as="li"
                  key={h.title}
                  anim="pop"
                  show={inView}
                  delay={idx * 90}
                  duration={500}
                  className="flex w-[78vw] shrink-0 snap-start flex-col sm:w-[42vw] md:w-[300px] lg:w-auto lg:min-w-0 lg:flex-1"
                  onMouseEnter={() => setHover(idx)}
                  onMouseLeave={() => setHover(null)}
                >
                  <span className={`mb-1.5 text-center font-mono text-[11px] transition-colors ${active ? "text-sky-400" : "text-slate-600"}`}>
                    {addr(idx)}
                  </span>

                  <div
                    className={`relative flex flex-1 flex-col border-y border-r border-slate-700 p-5 transition-colors duration-300 ${
                      first ? "rounded-l-2xl border-l" : ""
                    } ${last ? "rounded-r-2xl" : ""} ${active ? "bg-sky-950/60" : "bg-slate-950 hover:bg-slate-900"}`}
                  >
                    <span
                      className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-sky-400 to-violet-500 transition-transform duration-500 ${
                        active ? "scale-x-100" : "scale-x-0"
                      } ${first ? "rounded-tl-2xl" : ""} ${last ? "rounded-tr-2xl" : ""}`}
                    />
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border text-lg transition-colors duration-300 ${
                        active ? "border-sky-400/60 bg-sky-400/15 text-sky-300" : "border-slate-800 text-slate-500"
                      }`}
                    >
                      <Icon />
                    </span>
                    <span
                      className={`mt-4 font-extrabold tracking-tight transition-colors duration-300 ${
                        numeric ? "text-4xl tabular-nums" : "text-2xl lg:text-[1.35rem] xl:text-2xl"
                      } ${active ? "text-white" : "text-slate-100"}`}
                      style={active ? { textShadow: "0 0 24px rgba(56,189,248,.45)" } : undefined}
                    >
                      <CountUp value={h.value} start={inView} delay={idx * 110} />
                    </span>
                    <span className="mt-2 font-semibold text-slate-200">{h.title}</span>
                    <span className="mt-2 text-[13px] leading-relaxed text-slate-400">{h.detail}</span>
                  </div>

                  <span className={`mt-2 text-center font-mono text-sm transition-colors ${active ? "text-sky-300" : "text-slate-600"}`}>{idx}</span>
                  <span
                    className={`flex h-8 flex-col items-center font-mono text-xs leading-none text-sky-400 transition-opacity duration-300 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span>▲</span>
                    <span className="mt-0.5">i</span>
                  </span>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Bracket side="right" />
      </div>
    </Section>
  );
};

export default Highlights;
