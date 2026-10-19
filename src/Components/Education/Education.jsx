import { Fragment, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { education } from "../../data/portfolio";
import useInView from "../../hooks/useInView";
import Reveal from "../Reveal";
import { Fn, Section, SectionHeading } from "../ui";

const GAP = 380; // ms between enqueues

const Education = () => {
  const pipeRef = useRef(null);
  const inView = useInView(pipeRef, { threshold: 0.3 });
  const last = education.length - 1;

  return (
    <Section id="education" className="bg-slate-900/30">
      <SectionHeading
        title="Education"
        code={
          <>
            education.<Fn>enqueue</Fn>(degree);
          </>
        }
      />

      <div className="mb-3 flex justify-between gap-3 font-mono text-xs sm:text-sm">
        <span>
          <span className="rounded bg-sky-400 px-2 py-0.5 font-semibold text-slate-950">FRONT</span>
          <span className="ml-2 text-slate-500">← dequeue()</span>
        </span>
        <span className="text-right">
          <span className="mr-2 text-slate-500">enqueue() ←</span>
          <span className="rounded bg-violet-400 px-2 py-0.5 font-semibold text-slate-950">REAR</span>
        </span>
      </div>

      <div ref={pipeRef} className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0">
          <div className="ds-conveyor" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="ds-conveyor" />
        </div>
        {inView && <span className="ds-dot-x" style={{ top: 0 }} aria-hidden="true" />}

        <div className="flex snap-x snap-mandatory items-center gap-2 overflow-x-auto py-5 sm:gap-3 md:overflow-visible md:py-6">
          {education.map((e, i) => (
            <Fragment key={e.title}>
              <Reveal
                anim="enqueue"
                show={inView}
                delay={i * GAP}
                duration={700}
                className={`w-[78%] shrink-0 snap-center rounded-xl border bg-slate-950/70 p-5 transition-transform hover:-translate-y-1 sm:w-[48%] sm:p-6 md:w-auto md:flex-1 md:shrink ${
                  i === last ? "border-violet-400/50" : i === 0 ? "border-sky-400/50" : "border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-slate-500">queue[{i}]</span>
                  <span className="font-mono text-[11px] text-sky-300 sm:text-xs">{e.period}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-white">{e.degree}</h3>
                <p className="mt-1 text-sm text-slate-400">{e.place}</p>
                <p className="mt-4 border-t border-slate-800 pt-3 font-mono text-sm text-sky-400">
                  {e.scoreLabel}: {e.score}
                </p>
              </Reveal>
              {i < last && (
                <Reveal anim="fade" show={inView} delay={i * GAP + 500} className="shrink-0 text-xl text-sky-400/70">
                  <FiArrowRight />
                </Reveal>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <Reveal anim="fade" show={inView} delay={education.length * GAP + 400} className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-slate-500 sm:text-sm">
        <span>
          education.<span className="text-sky-300">size</span>() → <span className="text-orange-300">{education.length}</span>
        </span>
        <span>
          education.<span className="text-sky-300">peek</span>() → <span className="text-emerald-300">&quot;{education[0].degree}&quot;</span>
        </span>
      </Reveal>
    </Section>
  );
};

export default Education;
