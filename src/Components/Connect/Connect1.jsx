/* eslint-disable react/prop-types */
import { FiArrowUp, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode, SiLinktree } from "react-icons/si";
import { profile } from "../../data/portfolio";

const SECTIONS = [
  ["Highlights", "Array", "#highlights"],
  ["About", "String", "#about"],
  ["Experience", "Stack", "#experience"],
  ["Education", "Queue", "#education"],
  ["Projects", "Linked List", "#projects"],
  ["Skills", "Tree", "#skills"],
  ["Tech graph", "Graph", "#graph"],
  ["Contact", "Recursion", "#contact"],
];

const PROFILES = [
  ["GitHub", profile.links.github, FiGithub, "deepakmaurya1378"],
  ["LinkedIn", profile.links.linkedin, FiLinkedin, "deepak-maurya112"],
  ["LeetCode", profile.links.leetcode, SiLeetcode, "300+ problems"],
  ["Linktree", profile.links.linktree, SiLinktree, "all links"],
];

const Connect1 = ({ onPlay }) => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="font-mono text-2xl font-semibold text-white">
              <span className="text-sky-400">&lt;</span>deepak<span className="text-sky-400">/&gt;</span>
            </a>
            <p className="mt-4 max-w-sm leading-relaxed text-slate-400">
              {profile.title} building fast, scalable web apps with React, Next.js, Node.js and Spring Boot.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to new opportunities
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-300"
              >
                <FiDownload /> Resume
              </a>
              {onPlay && (
                <button
                  type="button"
                  onClick={onPlay}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-fuchsia-400 hover:text-fuchsia-300"
                >
                  🎮 Play the game version
                </button>
              )}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {SECTIONS.map(([label, , href]) => (
                <li key={href}>
                  <a href={href} className="group">
                    <span className="text-slate-300 transition-colors group-hover:text-sky-300">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Profiles</p>
            <ul className="mt-4 space-y-3">
              {PROFILES.map(([label, href, Icon, sub]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2.5 transition-colors hover:border-sky-400/50"
                  >
                    <Icon className="text-lg text-slate-400 group-hover:text-sky-300" />
                    <span className="text-sm text-slate-200">{label}</span>
                    <span className="ml-auto font-mono text-[11px] text-slate-500">{sub}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 py-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-1.5 transition-colors hover:border-sky-400 hover:text-sky-300"
          >
            <FiArrowUp /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Connect1;
