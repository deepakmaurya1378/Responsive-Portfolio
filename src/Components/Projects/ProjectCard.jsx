/* eslint-disable react/prop-types */
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { TagList } from "../ui";
import { addr } from "./addr";

const LinkBtn = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-200 transition-colors hover:border-sky-400 hover:text-sky-400"
  >
    {children}
  </a>
);

const Shot = ({ p, className }) => (
  <a
    href={p.demoLink || p.srcCode}
    target="_blank"
    rel="noopener noreferrer"
    tabIndex={-1}
    className={`block overflow-hidden bg-slate-800 ${className}`}
  >
    <img
      src={p.image}
      alt={`${p.title} screenshot`}
      loading="lazy"
      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
    />
  </a>
);

export const ProjectNode = ({ project: p, index, isLast }) => {
  const hasShot = p.featured && p.image;
  return (
    <article className="group flex overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-colors hover:border-sky-400/40">
      {hasShot && <Shot p={p} className="hidden w-80 shrink-0 border-r border-slate-800 md:block" />}

      <div className="min-w-0 flex-1">
        {hasShot && <Shot p={p} className="aspect-[16/10] border-b border-slate-800 md:hidden" />}
        <div className="p-4 sm:p-6">
          <p className="font-mono text-[11px] text-slate-500 sm:text-xs">
            data @ {addr(index)}
            {p.featured && <span className="ml-2 rounded bg-sky-400/15 px-1.5 py-0.5 text-sky-300">featured</span>}
          </p>
          <h3 className={`mt-2 font-bold text-white ${p.featured ? "text-lg sm:text-xl md:text-2xl" : "text-base sm:text-lg"}`}>{p.title}</h3>
          {p.period && <p className="mt-1 font-mono text-xs text-sky-300">{p.period}</p>}
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">{p.main}</p>
          <TagList items={p.tags} className="mt-4" />
          <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
            {p.demoLink && (
              <LinkBtn href={p.demoLink}>
                <FiArrowUpRight /> Live demo
              </LinkBtn>
            )}
            <LinkBtn href={p.srcCode}>
              <FiGithub /> Code
            </LinkBtn>
          </div>
        </div>
      </div>

      <div className="flex w-[68px] shrink-0 flex-col items-center justify-center gap-1 border-l border-slate-800 bg-slate-950/50 px-1 font-mono text-[10px] sm:w-24 sm:text-xs md:w-32">
        <span className="text-slate-500">next</span>
        <span className={`break-all text-center ${isLast ? "text-rose-400" : "text-sky-300"}`}>{isLast ? "null" : addr(index + 1)}</span>
        <span className={`mt-1 ${isLast ? "text-rose-400" : "text-sky-400"}`}>{isLast ? "∅" : "↓"}</span>
      </div>
    </article>
  );
};
