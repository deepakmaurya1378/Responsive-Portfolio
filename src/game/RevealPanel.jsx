/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode, SiLinktree } from "react-icons/si";
import { ContactForm } from "../Components/Connect/Connect";
import { fileName } from "./files";

const Btn = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="pq-btn">
    {children}
  </a>
);

const Tags = ({ list }) =>
  list?.length ? (
    <div className="flex flex-wrap gap-2 mt-4">
      {list.map((t) => (
        <span key={t} className="pq-tag">{t}</span>
      ))}
    </div>
  ) : null;

const Socials = ({ links }) => (
  <div className="flex gap-5 text-3xl mt-5 justify-center">
    <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-fuchsia-300"><FaGithub /></a>
    <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-fuchsia-300"><FaLinkedin /></a>
    <a href={links.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="hover:text-fuchsia-300"><SiLeetcode /></a>
    <a href={links.linktree} target="_blank" rel="noopener noreferrer" aria-label="Linktree" className="hover:text-fuchsia-300"><SiLinktree /></a>
  </div>
);

function Body({ item }) {
  const d = item.data;
  switch (item.kind) {
    case "profile":
      return (
        <>
          <h3 className="text-2xl md:text-3xl font-bold">{d.name}</h3>
          <p className="text-cyan-300 font-semibold mt-1">{d.role}</p>
          <p className="mt-4 leading-relaxed">{d.intro}</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Btn href={d.resume}>Resume</Btn>
            <Btn href={d.links.linkedin}>LinkedIn</Btn>
          </div>
          <p className="mt-5 text-sm text-slate-300">Keep moving right and hack more data nodes to decrypt the rest of my portfolio.</p>
        </>
      );
    case "job":
      return (
        <>
          <div className="flex flex-wrap justify-between gap-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">{d.role}</h3>
              <p className="text-cyan-300 font-semibold">{d.company}</p>
              <p className="text-sm text-slate-300">{d.type}{d.location && ` · ${d.location}`}</p>
            </div>
            <span className="pq-tag self-start">{d.period}</span>
          </div>
          {d.summary && <p className="mt-4 leading-relaxed">{d.summary}</p>}
          {d.points && (
            <ul className="list-disc list-inside mt-3 space-y-1">
              {d.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
          <Tags list={d.skills} />
          {d.work && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              {d.work.map((w) => {
                const inner = (
                  <>
                    <img src={w.image} alt={w.title} className="w-full h-24 object-cover object-top" />
                    <p className="text-xs font-semibold text-center mt-1">{w.title}{w.link && " ↗"}</p>
                  </>
                );
                return w.link ? (
                  <a key={w.title} href={w.link} target="_blank" rel="noopener noreferrer" className="pq-thumb">{inner}</a>
                ) : (
                  <div key={w.title} className="pq-thumb">{inner}</div>
                );
              })}
            </div>
          )}
        </>
      );
    case "education":
      return (
        <>
          <h3 className="text-xl md:text-2xl font-bold">{d.title}</h3>
          <p className="mt-3"><strong>{d.placeLabel}:</strong> {d.place}</p>
          <p><strong>Year of Completion:</strong> {d.year}</p>
          <p><strong>{d.scoreLabel}:</strong> {d.score}</p>
        </>
      );
    case "skills":
      return (
        <>
          <h3 className="text-xl md:text-2xl font-bold">{d.title}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {d.skills.map(([Icon, name]) => (
              <div key={name} className="pq-skill">
                <Icon className="text-2xl shrink-0" />
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>
        </>
      );
    case "project":
      return (
        <>
          {d.image && <img src={d.image} alt={d.title} className="w-full max-h-56 object-cover object-top pq-frame" />}
          <h3 className="text-xl md:text-2xl font-bold mt-4">{d.title}</h3>
          <p className="mt-2 leading-relaxed">{d.main}</p>
          <Tags list={d.tags} />
          <div className="flex flex-wrap gap-3 mt-5">
            {d.demoLink && <Btn href={d.demoLink}>Live Demo</Btn>}
            <Btn href={d.srcCode}>Source Code</Btn>
          </div>
        </>
      );
    case "contact":
      return (
        <>
          <p className="text-center">Connection to the mainframe established. Want to work together or just say hi?</p>
          <div className="flex justify-center mt-4">
            <Btn href={d.resume}>Download Resume</Btn>
          </div>
          <Socials links={d.links} />
          <div className="mt-6"><ContactForm /></div>
        </>
      );
    default:
      return null;
  }
}

const DIR = { boot: '~', experience: '~/experience', education: '~/education', skills: '~/skills', projects: '~/projects', contact: '~/mainframe' };

export default function RevealPanel({ item, isNew, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, [item]);

  const status =
    item.kind === 'contact'
      ? '✓ DEPLOYED TO PRODUCTION'
      : isNew
        ? '✓ ACCESS GRANTED · node decrypted'
        : '$ cat ' + fileName(item);

  return (
    <div className="pq-overlay" onClick={onClose}>
      <div className="pq-panel" role="dialog" aria-modal="true" aria-label={item.title} onClick={(e) => e.stopPropagation()}>
        <div className="pq-term-bar pq-mono">
          <span /><span /><span />
          <em>{DIR[item.zone]}/{fileName(item)}</em>
          <button ref={closeRef} type="button" onClick={onClose} className="pq-close" aria-label="Close">✕</button>
        </div>
        <div className="pq-panel-body">
          <p className={`pq-mono text-lg mb-4 ${isNew || item.kind === "contact" ? "text-emerald-300" : "text-slate-400"}`}>{status}</p>
          <Body item={item} />
          <div className="flex justify-end mt-6">
            <button type="button" onClick={onClose} className="pq-btn">
              {item.kind === 'contact' ? 'exit' : 'continue ▶'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
