import { useEffect, useRef, useState } from "react";
import { FiAward } from "react-icons/fi";
import { highlights } from "../../data/portfolio";
import useInView from "../../hooks/useInView";
import Reveal from "../Reveal";
import { Kw, Num, Section, SectionHeading, Str } from "../ui";

const Highlights = () => {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { threshold: 0.3 });
  const [cursor, setCursor] = useState(0);
  const [hover, setHover] = useState(null);
  const n = highlights.length;
  const i = hover ?? cursor;

  useEffect(() => {
    if (!inView || hover !== null) return;
    const t = setInterval(() => setCursor((c) => (c + 1) % n), 1400);
    return () => clearInterval(t);
  }, [inView, hover, n]);

  return (
    <Section id="highlights">
      <SectionHeading
        index="01"
        ds="Array"
        title="Highlights"
        code={
          <>
            <Kw>const</Kw> highlights = <Kw>new</Kw> Array(<Num>{n}</Num>);
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm">
        <span className="text-slate-500">
          <Kw>for</Kw> (<Kw>let</Kw> i = <Num>0</Num>; i &lt; <Num>{n}</Num>; i++)
        </span>
        <span className="rounded bg-sky-400/15 px-2 py-0.5 text-sky-300">i = {i}</span>
        <span className="min-w-0 flex-1 truncate text-slate-400">
          highlights[{i}] → <Str>&quot;{highlights[i].value} · {highlights[i].label}&quot;</Str>
        </span>
      </div>

      <ol
        ref={gridRef}
        className="flex snap-x snap-mandatory gap-px overflow-x-auto rounded-2xl border border-slate-700 bg-slate-700 sm:grid sm:grid-cols-4 sm:overflow-hidden lg:grid-cols-7"
      >
        {highlights.map((h, idx) => {
          const active = idx === i;
          const body = (
            <>
              <span className="flex items-center justify-between font-mono text-xs">
                <span className={active ? "text-sky-300" : "text-slate-500"}>[{idx}]</span>
                {active && <span className="text-sky-400">← i</span>}
              </span>
              <span className="mt-3 flex items-center gap-2 text-2xl font-extrabold text-white md:text-3xl">
                {h.cert && <FiAward className="text-xl text-sky-400" />}
                {h.value}
              </span>
              <span className="mt-2 text-sm leading-snug text-slate-400">{h.label}</span>
              {h.cert && <span className="mt-3 font-mono text-[11px] uppercase tracking-wider text-sky-400/80">certified</span>}
            </>
          );
          const cls = `relative flex h-full flex-col p-5 transition-colors duration-300 ${
            active ? "bg-sky-950/70" : "bg-slate-950 hover:bg-slate-900"
          }`;
          return (
            <Reveal
              as="li"
              key={h.label}
              className="relative w-[46%] shrink-0 snap-start sm:w-auto"
              anim="pop"
              show={inView}
              delay={idx * 110}
              duration={500}
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
            >
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-sky-400 transition-transform duration-300 ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
              {h.link ? (
                <a href={h.link} target="_blank" rel="noopener noreferrer" className={cls} onFocus={() => setHover(idx)} onBlur={() => setHover(null)}>
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
};

export default Highlights;
