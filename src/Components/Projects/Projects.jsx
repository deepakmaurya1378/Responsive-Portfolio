import { Fragment, useRef } from "react";
import { ProjectNode } from "./ProjectCard";
import { addr } from "./addr";
import { profile, projects } from "../../data/portfolio";
import useInView from "../../hooks/useInView";
import Reveal from "../Reveal";
import { Fn, Kw, Section, SectionHeading } from "../ui";

const Pointer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 1 });
  return (
    <div ref={ref} className="flex h-12 items-center justify-end pr-[30px] sm:pr-[44px] md:pr-[60px]" aria-hidden="true">
      <div className="relative flex h-full flex-col items-center">
        <span
          className="block w-px flex-1 origin-top bg-sky-400/60"
          style={{ transform: inView ? undefined : "scaleY(0)", animation: inView ? "ds-grow-y 450ms ease-out both" : "none" }}
        />
        <span className={`-mt-1 text-xs text-sky-400 transition-opacity delay-300 ${inView ? "opacity-100" : "opacity-0"}`}>▼</span>
        {inView && <span className="ds-dot-y" />}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <Section id="projects">
      <SectionHeading
        title="Projects"
        code={
          <>
            <Kw>for</Kw> (<Kw>let</Kw> node = head; node; node = node.next) <Fn>render</Fn>(node);
          </>
        }
      />

      <Reveal anim="fade-left" className="mb-3 flex items-center gap-3 font-mono text-sm">
        <span className="rounded bg-sky-400 px-2 py-0.5 font-semibold text-slate-950">head</span>
        <span className="text-slate-500">→ {addr(0)}</span>
      </Reveal>

      <div className="flex flex-col">
        {projects.map((p, i) => (
          <Fragment key={p.title}>
            <Reveal anim="fade-up" duration={700}>
              <ProjectNode project={p} index={i} isLast={i === projects.length - 1} />
            </Reveal>
            {i < projects.length - 1 && <Pointer />}
          </Fragment>
        ))}
      </div>

      <Reveal anim="fade-up" className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-sm">
        <span>
          <span className="text-slate-500">tail.next → </span>
          <span className="rounded bg-rose-400/15 px-2 py-0.5 text-rose-300">null</span>
        </span>
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
          more on GitHub →
        </a>
      </Reveal>
    </Section>
  );
};

export default Projects;
