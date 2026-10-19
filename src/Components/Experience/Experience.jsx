/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { jobs } from "../../data/portfolio";
import useInView from "../../hooks/useInView";
import Reveal from "../Reveal";
import { Fn, Section, SectionHeading, Str, TagList } from "../ui";

const PUSH_GAP = 550; // ms between the two initial pushes

const JobCard = ({ job, isTop, index, flash }) => (
  <article
    className={`rounded-xl border p-5 transition-colors md:p-7 ${
      isTop ? "border-sky-400/50 bg-sky-400/[0.04] shadow-lg shadow-sky-950/40" : "border-slate-800 bg-slate-900/60"
    } ${flash ? "ds-ping" : ""}`}
  >
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-mono text-xs text-slate-500">
        stack[{index}]{isTop && <span className="ml-2 text-sky-400">← top</span>}
      </span>
      <span className="font-mono text-sm text-sky-300">{job.period}</span>
    </div>

    <h3 className="mt-3 text-xl font-bold text-white md:text-2xl">
      {job.role} <span className="text-sky-400">@ {job.company}</span>
    </h3>
    <p className="mt-1 text-sm text-slate-500">
      {job.type}
      {job.location && ` · ${job.location}`}
    </p>

    {job.points && (
      <ul className="mt-4 max-w-4xl space-y-2">
        {job.points.map((p) => (
          <li key={p} className="flex gap-3 text-slate-300">
            <span className="mt-0.5 text-sky-400">▹</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    )}

    <TagList items={job.skills} className="mt-5" />

    {job.work && (
      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">Products I worked on</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {job.work.map((w) => {
            const inner = (
              <>
                <div className="aspect-[16/9] overflow-hidden bg-slate-800">
                  <img
                    src={w.image}
                    alt={w.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-200">
                  {w.title}
                  {w.link && <FiArrowUpRight className="text-slate-500 group-hover:text-sky-400" />}
                </p>
              </>
            );
            const cls = "group overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50 transition-colors";
            return w.link ? (
              <a key={w.title} href={w.link} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-sky-400/50`}>
                {inner}
              </a>
            ) : (
              <div key={w.title} className={cls}>{inner}</div>
            );
          })}
        </div>
      </div>
    )}
  </article>
);

const OpButton = ({ onClick, disabled, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="rounded-lg border border-slate-700 px-3 py-1.5 font-mono text-sm text-slate-200 transition-colors hover:border-sky-400 hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-40"
  >
    {children}
  </button>
);

const Experience = () => {
  const bucketRef = useRef(null);
  const inView = useInView(bucketRef, { threshold: 0.01 });
  const [popped, setPopped] = useState(0); // how many frames are currently popped off
  const [leaving, setLeaving] = useState(false);
  const [flash, setFlash] = useState(0);
  const [version, setVersion] = useState(0);
  const [log, setLog] = useState([]);
  const k = useRef(0);

  const write = useCallback((text) => setLog((l) => [...l.slice(-4), { text, k: k.current++ }]), []);

  useEffect(() => {
    if (!inView) return;
    const timers = [...jobs].reverse().map((j, n) =>
      setTimeout(() => write(`push(${j.company}) · size ${n + 1}`), n * PUSH_GAP + 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, write]);

  const visible = jobs.slice(popped);
  const top = visible[0];

  const pop = () => {
    if (!top || leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setLeaving(false);
      setPopped((p) => p + 1);
      write(`pop() → ${top.company} · size ${visible.length - 1}`);
    }, 420);
  };
  const push = () => {
    if (popped === 0) return;
    const job = jobs[popped - 1];
    setVersion((v) => v + 1);
    setPopped((p) => p - 1);
    write(`push(${job.company}) · size ${visible.length + 1}`);
  };
  const peek = () => {
    if (!top) return;
    setFlash((f) => f + 1);
    write(`peek() → ${top.company}`);
  };

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        ds="Stack"
        title="Experience"
        code={
          <>
            experience.<Fn>peek</Fn>() <span className="text-slate-500">→</span>{" "}
            <Str>&quot;{jobs[0].role} @ {jobs[0].company}&quot;</Str>
          </>
        }
      />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_270px]">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs sm:text-sm">
            <span className="rounded bg-sky-400 px-2 py-0.5 font-semibold text-slate-950">TOP</span>
          </div>

          <div ref={bucketRef} className="min-h-[160px] space-y-4 rounded-b-2xl border-x-2 border-b-2 border-slate-700 p-3 sm:p-4">
            {visible.length === 0 && (
              <p className="py-12 text-center font-mono text-sm text-slate-500">stack is empty</p>
            )}
            {visible.map((job, i) => {
              const originalIndex = popped + i;
              const isTop = i === 0;
              const delay = version === 0 ? (jobs.length - 1 - originalIndex) * PUSH_GAP : 0;
              return (
                <Reveal
                  key={`${job.company}-${isTop ? version : 0}`}
                  anim="push"
                  show={inView}
                  delay={delay}
                  duration={750}
                  style={isTop && leaving ? { animation: "ds-pop-out 420ms ease-in both" } : undefined}
                >
                  <JobCard job={job} isTop={isTop} index={jobs.length - 1 - originalIndex} flash={isTop && flash} key={flash} />
                </Reveal>
              );
            })}
          </div>
          <p className="mt-2 text-center font-mono text-xs text-slate-600">bottom of stack</p>
        </div>

        <aside className="order-first h-fit rounded-2xl border border-slate-800 bg-slate-900/60 p-4 font-mono text-sm sm:p-5 lg:sticky lg:top-24 lg:order-none">
          <p className="text-xs uppercase tracking-wider text-slate-500">operations</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <OpButton onClick={peek} disabled={!top}>peek()</OpButton>
            <OpButton onClick={pop} disabled={!top || leaving}>pop()</OpButton>
            <OpButton onClick={push} disabled={popped === 0}>push()</OpButton>
          </div>
          <p className="mt-4 text-slate-400">
            size: <span className="text-orange-300">{visible.length}</span>
          </p>
          <div className="mt-3 space-y-1 rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-xs">
            {log.length === 0 && <p className="text-slate-600">$ waiting…</p>}
            {log.map((l) => (
              <Reveal key={l.k} anim="fade-left" duration={300} show className="truncate text-emerald-300">
                <span className="text-slate-600">$ </span>
                {l.text}
              </Reveal>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
};

export default Experience;
