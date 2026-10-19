/* eslint-disable react/prop-types */
import { useRef } from "react";
import useInView from "../hooks/useInView";

export const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-16 py-14 md:py-20 ${className}`}>
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

export const SectionHeading = ({ title, subtitle, code }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const anim = (delay) => ({
    opacity: inView ? undefined : 0,
    animation: inView ? `ds-fade-up 650ms cubic-bezier(.2,.8,.2,1) ${delay}ms both` : "none",
  });
  return (
  <div ref={ref} className="mb-7 md:mb-9">
    <h2 style={anim(0)} className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h2>
    <div
      className="mt-4 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
      style={{ transform: inView ? undefined : "scaleX(0)", animation: inView ? "ds-grow-x 700ms ease-out 250ms both" : "none" }}
    />
    {subtitle && <p style={anim(200)} className="mt-4 max-w-2xl text-lg text-slate-400">{subtitle}</p>}
    {code && (
      <pre style={anim(300)} className="mt-5 max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 font-mono text-[13px] leading-6 text-slate-300 sm:text-sm">
        <code className={inView ? "ds-type ds-caret" : "opacity-0"} style={{ animationDelay: "450ms" }}>
          {code}
        </code>
      </pre>
    )}
  </div>
  );
};

export const Kw = ({ children }) => <span className="text-violet-400">{children}</span>;
export const Str = ({ children }) => <span className="text-emerald-300">{children}</span>;
export const Fn = ({ children }) => <span className="text-sky-300">{children}</span>;
export const Num = ({ children }) => <span className="text-orange-300">{children}</span>;
export const Cm = ({ children }) => <span className="text-slate-500">{children}</span>;

export const Tag = ({ children }) => (
  <span className="rounded-md border border-slate-700/80 bg-slate-800/60 px-2.5 py-1 font-mono text-xs text-slate-300">
    {children}
  </span>
);

export const TagList = ({ items, className = "" }) =>
  items?.length ? (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  ) : null;

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-800 bg-slate-900/50 ${className}`}>{children}</div>
);

export const ButtonLink = ({ href, children, variant = "primary", external = true, className = "" }) => {
  const styles =
    variant === "primary"
      ? "bg-sky-400 text-slate-950 hover:bg-sky-300"
      : "border border-slate-700 text-slate-200 hover:border-sky-400 hover:text-sky-400";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${styles} ${className}`}
    >
      {children}
    </a>
  );
};
