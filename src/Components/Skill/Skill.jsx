import { useEffect, useMemo, useRef, useState } from "react";
import { skillGroups } from "../../data/portfolio";
import useInView from "../../hooks/useInView";
import Reveal from "../Reveal";
import { Section, SectionHeading } from "../ui";

const leafCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);
const LINE = "bg-slate-600";

const DFS = ["root", ...skillGroups.flatMap((g, i) => [`c${i}`, ...g.skills.map((_, j) => `c${i}-${j}`)])];
const BFS = ["root", ...skillGroups.map((_, i) => `c${i}`), ...skillGroups.flatMap((g, i) => g.skills.map((_, j) => `c${i}-${j}`))];
const nameOf = (id) => {
  if (id === "root") return "skills";
  const [, c, l] = id.match(/^c(\d+)(?:-(\d+))?$/);
  return l === undefined ? skillGroups[c].title : skillGroups[c].skills[l][1];
};

const tone = (state) =>
  state === "current"
    ? "border-amber-300 bg-amber-300/20 text-white shadow-lg shadow-amber-500/30 scale-105"
    : state === "visited"
      ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100"
      : "";

const Skills = () => {
  const treeRef = useRef(null);
  const inView = useInView(treeRef, { threshold: 0.15 });
  const [collapsed, setCollapsed] = useState(() => new Set());
  const [run, setRun] = useState(null); // { order, step, kind }

  useEffect(() => {
    const el = treeRef.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  useEffect(() => {
    if (!run) return;
    if (run.step >= run.order.length) {
      const t = setTimeout(() => setRun(null), 1800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRun((r) => ({ ...r, step: r.step + 1 })), run.step === 0 ? 300 : 110);
    return () => clearTimeout(t);
  }, [run]);

  const state = useMemo(() => {
    if (!run) return () => "";
    const visited = new Set(run.order.slice(0, run.step));
    const current = run.order[run.step - 1];
    return (id) => (id === current ? "current" : visited.has(id) ? "visited" : "");
  }, [run]);

  const start = (kind) => {
    setCollapsed(new Set());
    setRun({ kind, order: kind === "DFS" ? DFS : BFS, step: 0 });
  };
  const toggle = (i) =>
    setCollapsed((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  const last = skillGroups.length - 1;
  const trail = run ? run.order.slice(Math.max(0, run.step - 6), run.step).map(nameOf) : [];

  return (
    <Section id="skills" className="bg-slate-900/30">
      <SectionHeading
        title="Skills"
        code={
          <>
            skills.<span className="text-sky-300">traverse</span>(root); <span className="text-slate-500">→</span> {skillGroups.length} branches, {leafCount} leaves
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-sm">
        <button
          type="button"
          onClick={() => start("DFS")}
          disabled={!!run}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-200 transition-colors hover:border-amber-300 hover:text-amber-200 disabled:opacity-40"
        >
          ▶ dfs(root)
        </button>
        <button
          type="button"
          onClick={() => start("BFS")}
          disabled={!!run}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-200 transition-colors hover:border-amber-300 hover:text-amber-200 disabled:opacity-40"
        >
          ▶ bfs(root)
        </button>
        <span className="min-w-0 flex-1 truncate text-slate-400">
          {run ? (
            <>
              <span className="text-amber-300">{run.kind}</span> visited {Math.min(run.step, run.order.length)}/{run.order.length}
              {trail.length > 0 && <span className="text-slate-500"> · … {trail.join(" → ")}</span>}
            </>
          ) : (
            null
          )}
        </span>
      </div>

      <div ref={treeRef} className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <div className="min-w-[1060px] lg:min-w-0">
        <div className="flex flex-col items-center">
          <Reveal anim="pop" show={inView}>
            <span
              className={`inline-block rounded-xl border border-sky-400/70 bg-sky-400/10 px-6 py-3 font-mono text-lg font-bold text-sky-200 shadow-lg shadow-sky-900/50 transition-all ${tone(state("root"))}`}
            >
              skills
            </span>
          </Reveal>
          <span
            className={`block h-8 w-0.5 origin-top ${LINE}`}
            style={{ transform: inView ? undefined : "scaleY(0)", animation: inView ? "ds-grow-y 300ms ease-out 300ms both" : "none" }}
          />
        </div>

        <ul className="grid grid-cols-7">
          {skillGroups.map((group, i) => {
            const open = !collapsed.has(i);
            return (
              <li key={group.title} className="relative flex min-w-0 flex-col items-center px-1.5">
                {i > 0 && <span className={`absolute left-0 right-1/2 top-0 h-0.5 ${LINE}`} />}
                {i < last && <span className={`absolute left-1/2 right-0 top-0 h-0.5 ${LINE}`} />}
                <span className={`h-5 w-0.5 ${LINE}`} />

                <Reveal anim="pop" show={inView} delay={450 + i * 90} duration={450} className="w-full">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={open}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg border border-violet-400/50 bg-violet-400/10 px-3 py-2 text-left font-mono text-sm font-bold text-violet-100 transition-all hover:border-violet-300 ${tone(state(`c${i}`))}`}
                  >
                    <span className="leading-tight">{group.title}</span>
                    <span className="text-xs text-violet-300">{open ? "▾" : `▸ ${group.skills.length}`}</span>
                  </button>
                </Reveal>

                {open && (
                  <ul className="mt-1 w-full pl-3">
                    {group.skills.map(([Icon, name], j) => {
                      const isLast = j === group.skills.length - 1;
                      return (
                        <Reveal
                          as="li"
                          key={name}
                          anim="fade-left"
                          show={inView}
                          delay={700 + i * 90 + j * 45}
                          duration={350}
                          className="relative pl-4 pt-2"
                        >
                          <span className={`absolute left-0 top-0 w-0.5 ${LINE} ${isLast ? "h-[calc(50%+4px)]" : "h-full"}`} />
                          <span className={`absolute left-0 top-[calc(50%+4px)] h-0.5 w-3.5 ${LINE}`} />
                          <span
                            className={`flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950/70 px-2 py-1.5 text-[13px] text-slate-200 transition-all ${tone(state(`c${i}-${j}`))}`}
                          >
                            <Icon className="shrink-0 text-slate-400" />
                            <span className="min-w-0 leading-tight">{name}</span>
                          </span>
                        </Reveal>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-5 font-mono text-xs text-slate-500">
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm border border-sky-400 bg-sky-400/20" />root</span>
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm border border-violet-400 bg-violet-400/20" />internal node</span>
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm border border-slate-600 bg-slate-900" />leaf</span>
      </div>
    </Section>
  );
};

export default Skills;
