import { useEffect, useRef, useState } from "react";
import { profile } from "../../data/portfolio";
import useInView from "../../hooks/useInView";
import Reveal from "../Reveal";
import { Card, Fn, Kw, Num, Section, SectionHeading, Str } from "../ui";

const CHAR_DELAY = 70;

const About = () => {
  const chars = [...profile.name];
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { threshold: 0.4 });
  const [scan, setScan] = useState(-1);
  const [hover, setHover] = useState(null);
  const i = hover ?? scan;

  useEffect(() => {
    if (!inView || hover !== null) return;
    const begin = setTimeout(() => setScan((s) => (s < 0 ? 0 : s)), chars.length * CHAR_DELAY + 500);
    const t = setInterval(() => setScan((s) => (s < 0 ? s : (s + 1) % chars.length)), 600);
    return () => {
      clearTimeout(begin);
      clearInterval(t);
    };
  }, [inView, hover, chars.length]);

  const ch = i >= 0 ? chars[i] : null;

  return (
    <Section id="about" className="bg-slate-900/30">
      <SectionHeading
        title="About me"
        code={
          <>
            <Kw>const</Kw> name: <Kw>string</Kw> = <Str>&quot;{profile.name}&quot;</Str>;
          </>
        }
      />

      <div ref={rowRef} className="flex" onMouseLeave={() => setHover(null)}>
        {chars.map((c, idx) => (
          <Reveal
            key={idx}
            anim="pop"
            show={inView}
            delay={idx * CHAR_DELAY}
            duration={380}
            className="flex min-w-0 flex-1 flex-col items-center sm:flex-none"
            onMouseEnter={() => setHover(idx)}
          >
            <span
              className={`flex h-11 w-full items-center justify-center border-y border-r font-mono text-lg font-bold transition-all duration-200 sm:h-14 sm:w-12 sm:text-2xl ${
                idx === 0 ? "rounded-l-lg border-l" : ""
              } ${idx === chars.length - 1 ? "rounded-r-lg" : ""} ${
                idx === i
                  ? "relative z-10 -translate-y-1 border-sky-300 bg-sky-400/25 text-white shadow-lg shadow-sky-500/30"
                  : c === " "
                    ? "border-sky-400/40 bg-slate-900 text-slate-600"
                    : "border-sky-400/40 bg-sky-400/5 text-white"
              }`}
            >
              {c === " " ? "␣" : c}
            </span>
            <span className={`mt-1 font-mono text-[10px] sm:text-[11px] ${idx === i ? "text-sky-300" : "text-slate-500"}`}>{idx}</span>
          </Reveal>
        ))}
      </div>

      <p className="mt-4 min-h-5 font-mono text-xs text-slate-400 sm:text-sm">
        {ch !== null && (
          <>
            name.<Fn>charAt</Fn>(<Num>{i}</Num>) → <Str>&quot;{ch}&quot;</Str>
            <span className="text-slate-600"> · </span>
            name.<Fn>charCodeAt</Fn>(<Num>{i}</Num>) → <Num>{ch.charCodeAt(0)}</Num>
          </>
        )}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal anim="fade-up">
          <Card className="h-full p-6 md:p-8">
            <p className="font-mono text-sm text-slate-500">
              <Kw>const</Kw> bio = <Str>`</Str>
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200 md:text-xl">{profile.intro}</p>
            <p className="mt-3 font-mono text-sm">
              <Str>`</Str>;
            </p>
          </Card>
        </Reveal>

        <Reveal anim="fade-up" delay={150}>
          <Card className="h-full p-6 font-mono text-sm md:p-8">
            <Reveal anim="fade-left" delay={300} className="text-slate-300">
              bio.<Fn>includes</Fn>(<Str>&quot;Redis&quot;</Str>) <span className="text-slate-500">→</span> <Num>true</Num>
            </Reveal>
            <Reveal anim="fade-left" delay={500} className="mt-2 text-slate-300">
              role.<Fn>toUpperCase</Fn>() <span className="text-slate-500">→</span>
              <p className="pl-4 text-emerald-300">&quot;{profile.title.toUpperCase()}&quot;</p>
            </Reveal>
            <Reveal anim="fade-left" delay={700} className="mt-4 text-slate-300">
              focus.<Fn>split</Fn>(<Str>&quot;, &quot;</Str>) <span className="text-slate-500">→</span>
            </Reveal>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.focus.map((f, idx) => (
                <Reveal
                  as="li"
                  key={f}
                  anim="pop"
                  delay={850 + idx * 90}
                  duration={400}
                  className="rounded-md border border-slate-700 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-200"
                >
                  <span className="text-slate-500">{idx}:</span> {f}
                </Reveal>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
};

export default About;
