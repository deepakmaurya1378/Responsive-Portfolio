/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { FiDownload, FiLinkedin, FiRotateCcw } from "react-icons/fi";
import { profile } from "../../data/portfolio";
import useInView from "../../hooks/useInView";
import Reveal from "../Reveal";
import { ButtonLink, Section, SectionHeading } from "../ui";

const inputCls =
  "w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30";

export const ContactForm = () => {
  const [status, setStatus] = useState(null); // { ok, text }
  const [sending, setSending] = useState(false);

  const sendEmail = (event) => {
    event.preventDefault();
    const form = event.target;
    setSending(true);
    setStatus(null);

    emailjs
      .send(
        "service_5h0344g",
        "template_oviizwo",
        {
          to_name: profile.name,
          from_name: form.name.value,
          email_id: form.email.value,
          message: form.message.value,
        },
        "hqrCcUjgV1VRMZh9H" // EmailJS public key
      )
      .then(
        () => {
          setStatus({ ok: true, text: "Thanks! Your message was sent. I'll get back to you soon." });
          form.reset();
        },
        (error) => {
          setStatus({ ok: false, text: "Sorry, the message couldn't be sent. Please try again later." });
          console.error("EmailJS error:", error);
        }
      )
      .finally(() => setSending(false));
  };

  return (
    <form onSubmit={sendEmail} className="flex flex-col gap-5 text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
          Name
          <input type="text" name="name" placeholder="Your name" required className={inputCls} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
          Email
          <input type="email" name="email" placeholder="you@example.com" required className={inputCls} />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
        Message
        <textarea name="message" rows="5" placeholder="Tell me about your project or role…" required className={inputCls} />
      </label>
      <button
        type="submit"
        disabled={sending}
        className="rounded-lg bg-sky-400 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-sky-300 disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
      {status && (
        <p role="status" className={`text-sm ${status.ok ? "text-emerald-400" : "text-red-400"}`}>
          {status.text}
        </p>
      )}
    </form>
  );
};

/* ---------------- recursion visualizer ---------------- */

const START = 3;
const RESULT = '"conversation started"';

const CODE = [
  <><K>function</K> <F>connect</F>(you, depth) {"{"}</>,
  <>  <K>if</K> (depth === <N>0</N>)</>,
  <>    <K>return</K> <F>sendMessage</F>(you); <C>{"// base case"}</C></>,
  <>  <K>return</K> <F>connect</F>(you, depth - <N>1</N>);</>,
  <>{"}"}</>,
  <> </>,
  <><F>connect</F>(you, <N>{START}</N>);</>,
];
function K({ children }) { return <span className="text-violet-400">{children}</span>; }
function F({ children }) { return <span className="text-sky-300">{children}</span>; }
function N({ children }) { return <span className="text-orange-300">{children}</span>; }
function C({ children }) { return <span className="text-slate-500">{children}</span>; }

function buildSteps() {
  const steps = [];
  const frames = [];
  const snap = (line, note, extra = {}) => steps.push({ line, note, stack: frames.map((f) => ({ ...f })), ...extra });

  snap(6, `call connect(you, ${START})`);
  for (let d = START; d >= 0; d--) {
    frames.forEach((f) => (f.status = "waiting"));
    frames.push({ depth: d, status: "active" });
    snap(0, `push frame · depth = ${d}`);
    snap(1, d === 0 ? "depth === 0 → true" : `depth === ${d} → false`);
    if (d > 0) snap(3, `recurse: connect(you, ${d - 1})`);
  }
  frames[frames.length - 1].status = "base";
  snap(2, "base case reached → sendMessage(you)", { base: true });
  while (frames.length) {
    const top = frames[frames.length - 1];
    top.status = "returning";
    top.ret = RESULT;
    snap(top.depth === 0 ? 2 : 3, `return ${RESULT} from depth ${top.depth}`, { base: true });
    frames.pop();
    if (frames.length) frames[frames.length - 1].status = "active";
  }
  snap(6, `connect(you, ${START}) → ${RESULT} ✓`, { base: true, done: true });
  return steps;
}
const STEPS = buildSteps();
const BASE_STEP = STEPS.findIndex((s) => s.base);

const FRAME_STYLE = {
  waiting: "border-slate-700 bg-slate-900/70 text-slate-400",
  active: "border-sky-400/70 bg-sky-400/10 text-sky-100 shadow-lg shadow-sky-900/40",
  base: "border-emerald-400/70 bg-emerald-400/10 text-emerald-100 shadow-lg shadow-emerald-900/40",
  returning: "border-amber-300/70 bg-amber-300/10 text-amber-100",
};

const RecursionVisualizer = ({ step, playing, onReplay }) => {
  const s = STEPS[step];
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/60">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
        <span className="font-mono text-xs text-slate-500">recursion.js · step {step + 1}/{STEPS.length}</span>
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-sky-400 hover:text-sky-300"
        >
          <FiRotateCcw /> {playing ? "restart" : "replay"}
        </button>
      </div>

      <div className="grid flex-1 gap-0 md:grid-cols-[1fr_200px]">
        <pre className="overflow-x-auto border-slate-800 p-4 font-mono text-[12px] leading-7 sm:text-[13px] md:border-r md:text-[12px] xl:text-[13px]">
          {CODE.map((line, i) => (
            <div
              key={i}
              className={`-mx-2 flex rounded px-2 transition-colors duration-300 ${i === s.line ? "bg-sky-400/15" : ""}`}
            >
              <span className="mr-3 w-4 shrink-0 select-none text-right text-slate-600">{i + 1}</span>
              <span className="whitespace-pre text-slate-300">{line}</span>
              {i === s.line && <span className="ml-auto pl-2 text-sky-400">◀</span>}
            </div>
          ))}
        </pre>

        <div className="flex flex-col p-4">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500">call stack</p>
          <div className="mt-3 flex min-h-[220px] flex-1 flex-col-reverse justify-start gap-2">
            {s.stack.map((f) => (
              <div
                key={f.depth}
                className={`rounded-lg border px-3 py-2 font-mono text-xs transition-all duration-300 ${FRAME_STYLE[f.status]}`}
                style={{ animation: "ds-push 450ms cubic-bezier(.2,.8,.2,1) both" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>connect(you, {f.depth})</span>
                  <span className="text-[10px] uppercase opacity-70">{f.status}</span>
                </div>
                {f.ret && <div className="mt-1 text-amber-200">↩ {f.ret}</div>}
              </div>
            ))}
            {s.stack.length === 0 && (
              <p className="m-auto font-mono text-xs text-slate-600">{s.done ? "stack empty · done ✓" : "stack empty"}</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-5 py-3 font-mono text-xs">
        <span className="text-slate-500">$ </span>
        <span className={s.done ? "text-emerald-300" : "text-slate-300"}>{s.note}</span>
      </div>
    </div>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (inView) setPlaying(true);
  }, [inView]);

  useEffect(() => {
    if (!playing) return;
    if (step >= STEPS.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((x) => x + 1), step === 0 ? 700 : 650);
    return () => clearTimeout(t);
  }, [playing, step]);

  const replay = () => {
    setStep(0);
    setPlaying(true);
  };
  const baseReached = step >= BASE_STEP;

  return (
    <Section id="contact" className="bg-slate-900/30">
      <SectionHeading
        index="08"
        ds="Recursion"
        title="Let's work together"
      />

      <div ref={ref} className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <Reveal anim="fade-up" show={inView}>
          <RecursionVisualizer step={step} playing={playing} onReplay={replay} />
        </Reveal>

        <Reveal anim="fade-up" show={inView} delay={150}>
          <div
            className={`h-full rounded-2xl border p-6 transition-all duration-500 sm:p-8 ${
              baseReached
                ? "border-emerald-400/60 bg-slate-950/70 shadow-xl shadow-emerald-950/50"
                : "border-slate-800 bg-slate-950/50"
            }`}
          >
            <p className="font-mono text-xs">
              <span className={baseReached ? "text-emerald-300" : "text-slate-500"}>connect(you, 0)</span>
              <span className="text-slate-500"> → base case: sendMessage(you)</span>
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white">Say hello 👋</h3>
            <p className="mt-2 leading-relaxed text-slate-400">
              Open to full-stack and backend roles, freelance work and collaborations.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href={profile.resume}>
                <FiDownload /> Download resume
              </ButtonLink>
              <ButtonLink href={profile.links.linkedin} variant="outline">
                <FiLinkedin /> LinkedIn
              </ButtonLink>
            </div>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default Contact;
