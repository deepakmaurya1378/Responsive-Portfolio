/* eslint-disable react/prop-types */
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { profile } from "../../data/portfolio";
import Reveal from "../Reveal";
import { ButtonLink } from "../ui";

const S = ({ children }) => <span className="text-emerald-300">&quot;{children}&quot;</span>;
const list = (items) => (
  <>
    [
    {items.map((t, i) => (
      <span key={t}>
        <S>{t}</S>
        {i < items.length - 1 && ", "}
      </span>
    ))}
    ]
  </>
);

const CODE_LINES = [
  <>
    <span className="text-violet-400">const</span> <span className="text-sky-300">deepak</span> <span className="text-slate-500">=</span> {"{"}
  </>,
  <>  role: <S>{profile.title}</S>,</>,
  <>  company: <S>MeriLipi</S>,</>,
  <>  frontend: {list(["React", "Next.js", "TypeScript"])},</>,
  <>  backend: {list(["Node.js", "Spring Boot", "Redis"])},</>,
  <>  cloud: {list(["AWS", "Azure", "Docker"])},</>,
  <>  openToWork: <span className="text-orange-300">true</span>,</>,
  <>{"};"}</>,
];

const CodeCard = () => (
  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-sky-950/40 backdrop-blur">
    <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-red-400/80" />
      <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
      <span className="h-3 w-3 rounded-full bg-green-400/80" />
      <span className="ml-3 font-mono text-xs text-slate-500">deepak.ts</span>
    </div>
    <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-6 sm:p-5 sm:text-sm">
      {CODE_LINES.map((line, i) => (
        <Reveal key={i} anim="fade-left" show delay={600 + i * 160} duration={350} className="flex whitespace-pre">
          <span className="mr-4 w-4 shrink-0 select-none text-right text-slate-600">{i + 1}</span>
          <span className={`text-slate-300 ${i === CODE_LINES.length - 1 ? "ds-caret" : ""}`}>{line}</span>
        </Reveal>
      ))}
    </pre>
  </div>
);

function Home() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 md:pb-28 md:pt-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#334155 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[min(900px,140vw)] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl"
        style={{ animation: "ds-drift 12s ease-in-out infinite" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-8">
        <div className="min-w-0">
          <Reveal anim="fade-up" show>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.role}
            </p>
          </Reveal>

          <Reveal anim="fade-up" show delay={100}>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Hi, I&apos;m <span className="ds-shimmer">{profile.name}</span>.
            </h1>
          </Reveal>
          <Reveal anim="fade-up" show delay={200}>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-400 sm:text-3xl md:text-4xl">{profile.headline}</p>
          </Reveal>
          <Reveal anim="fade-up" show delay={300}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">{profile.intro}</p>
          </Reveal>

          <Reveal anim="fade-up" show delay={400} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" external={false}>
              View my work <FiArrowRight />
            </ButtonLink>
            <ButtonLink href={profile.resume} variant="outline">
              <FiDownload /> Resume
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal anim="fade-up" show delay={350} className="min-w-0">
          <CodeCard />
        </Reveal>
      </div>
    </section>
  );
}

export default Home;
