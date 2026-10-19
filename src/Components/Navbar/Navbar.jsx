/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { profile } from "../../data/portfolio";

const LINKS = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

function Navbar({ onPlay }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      let current = "";
      LINKS.forEach(([, href]) => {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = href;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || menu ? "border-b border-slate-800 bg-slate-950/80 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="font-mono text-lg font-semibold text-white" onClick={() => setMenu(false)}>
          <span className="text-sky-400">&lt;</span>deepak<span className="text-sky-400">/&gt;</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className={"relative py-1 transition-colors hover:text-white " + (active === href ? "text-white" : "text-slate-400")}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded bg-sky-400 transition-transform duration-300 ${
                    active === href ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={onPlay}
            className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            🎮 Game mode
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-sky-400/60 px-4 py-2 text-sm font-medium text-sky-400 transition-colors hover:bg-sky-400/10"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          className="text-2xl text-slate-200 lg:hidden"
          onClick={() => setMenu(!menu)}
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
        >
          {menu ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {menu && (
        <div className="border-t border-slate-800 px-4 pb-6 sm:px-6 lg:hidden">
          <ul className="flex flex-col py-2">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenu(false)}
                  className={"block py-3 hover:text-white " + (active === href ? "text-sky-300" : "text-slate-300")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-sky-400/60 py-2.5 text-center text-sm font-medium text-sky-400"
            >
              Resume
            </a>
            <button type="button" onClick={onPlay} className="flex-1 rounded-lg border border-slate-700 py-2.5 text-sm text-slate-300">
              🎮 Game mode
            </button>
          </div>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-sky-400 to-violet-500"
          style={{ transform: "scaleX(" + progress + ")" }}
        />
      </div>
    </header>
  );
}

export default Navbar;
