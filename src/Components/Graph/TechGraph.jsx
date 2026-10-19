import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../../data/portfolio";
import useInView from "../../hooks/useInView";
import { Fn, Section, SectionHeading, Str } from "../ui";

const NORMALIZE = { "React.js": "React", "Tailwind CSS": "Tailwind", "Redux Toolkit": "Redux" };
const shortTitle = (t) => t.split(":")[0];

const W = 960;
const H = 600;

function buildGraph() {
  const nodes = [];
  const index = {};
  const add = (id, label, kind) => {
    if (index[id] === undefined) {
      index[id] = nodes.length;
      nodes.push({ id, label, kind });
    }
  };
  const edges = [];
  projects.forEach((p) => {
    add(`p:${p.title}`, shortTitle(p.title), "project");
    (p.tags || []).forEach((t) => {
      const tech = NORMALIZE[t] || t;
      add(`t:${tech}`, tech, "tech");
      edges.push([index[`p:${p.title}`], index[`t:${tech}`]]);
    });
  });
  const adj = nodes.map(() => []);
  edges.forEach(([a, b]) => {
    adj[a].push(b);
    adj[b].push(a);
  });
  return { nodes, edges, adj, layout: forceLayout(nodes, edges) };
}

function forceLayout(nodes, edges) {
  const n = nodes.length;
  const pos = nodes.map((_, i) => {
    const a = (i / n) * Math.PI * 2;
    return { x: W / 2 + Math.cos(a) * 220, y: H / 2 + Math.sin(a) * 200, vx: 0, vy: 0 };
  });
  for (let it = 0; it < 500; it++) {
    const cool = 1 - it / 500;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = pos[i].x - pos[j].x;
        const dy = pos[i].y - pos[j].y;
        const d2 = Math.max(dx * dx + dy * dy, 25);
        const f = 5200 / d2;
        const d = Math.sqrt(d2);
        pos[i].vx += (dx / d) * f;
        pos[i].vy += (dy / d) * f;
        pos[j].vx -= (dx / d) * f;
        pos[j].vy -= (dy / d) * f;
      }
    }
    edges.forEach(([a, b]) => {
      const dx = pos[b].x - pos[a].x;
      const dy = pos[b].y - pos[a].y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const f = (d - 95) * 0.03;
      pos[a].vx += (dx / d) * f;
      pos[a].vy += (dy / d) * f;
      pos[b].vx -= (dx / d) * f;
      pos[b].vy -= (dy / d) * f;
    });
    pos.forEach((p) => {
      p.vx += (W / 2 - p.x) * 0.004;
      p.vy += (H / 2 - p.y) * 0.006;
      p.x += Math.max(-12, Math.min(12, p.vx)) * cool;
      p.y += Math.max(-12, Math.min(12, p.vy)) * cool;
      p.vx *= 0.6;
      p.vy *= 0.6;
      p.x = Math.max(70, Math.min(W - 70, p.x));
      p.y = Math.max(36, Math.min(H - 36, p.y));
    });
  }
  return pos.map(({ x, y }) => ({ x, y }));
}

function bfs(adj, start) {
  const level = { [start]: 0 };
  const order = [start];
  for (let q = 0; q < order.length; q++) {
    const v = order[q];
    adj[v].forEach((w) => {
      if (level[w] === undefined) {
        level[w] = level[v] + 1;
        order.push(w);
      }
    });
  }
  return level;
}

const LEVEL_COLORS = ["#fbbf24", "#38bdf8", "#a78bfa", "#34d399", "#f472b6", "#fb923c"];

const TechGraph = () => {
  const g = useMemo(buildGraph, []);
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { threshold: 0.25 });
  const reactId = g.nodes.findIndex((n) => n.id === "t:React");
  const [hover, setHover] = useState(null);
  const [start, setStart] = useState(reactId);
  const [wave, setWave] = useState(null); // { level: {v: depth}, depth: current frontier }

  useEffect(() => {
    if (!wave) return;
    const maxDepth = Math.max(...Object.values(wave.level));
    if (wave.depth > maxDepth) {
      const t = setTimeout(() => setWave(null), 2200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setWave((w) => ({ ...w, depth: w.depth + 1 })), 750);
    return () => clearTimeout(t);
  }, [wave]);

  const runBfs = () => setWave({ level: bfs(g.adj, start), depth: 0 });

  const focus = hover;
  const neighbourSet = focus !== null ? new Set([focus, ...g.adj[focus]]) : null;

  const vertexColor = (i) => {
    if (wave) {
      const d = wave.level[i];
      if (d !== undefined && d <= wave.depth) return LEVEL_COLORS[d % LEVEL_COLORS.length];
      return "#334155";
    }
    return g.nodes[i].kind === "project" ? "#38bdf8" : "#a78bfa";
  };
  const vertexDim = (i) => (neighbourSet ? !neighbourSet.has(i) : wave ? !(wave.level[i] <= wave.depth) : false);
  const edgeOn = ([a, b]) => {
    if (neighbourSet) return a === focus || b === focus;
    if (wave) return wave.level[a] <= wave.depth && wave.level[b] <= wave.depth && Math.abs(wave.level[a] - wave.level[b]) === 1;
    return false;
  };

  const info =
    focus !== null ? (
      <>
        <span className="text-sky-300">{g.nodes[focus].label}</span> · degree {g.adj[focus].length} → {g.adj[focus].map((v) => g.nodes[v].label).join(", ")}
      </>
    ) : wave ? (
      <>
        <span className="text-amber-300">bfs(&quot;{g.nodes[start].label}&quot;)</span> · level {Math.min(wave.depth, Math.max(...Object.values(wave.level)))} ·{" "}
        {Object.values(wave.level).filter((d) => d <= wave.depth).length}/{g.nodes.length} vertices reached
      </>
    ) : (
      null
    );

  return (
    <Section id="graph">
      <SectionHeading
        title="How my work connects"
        code={
          <>
            graph.<Fn>bfs</Fn>(<Str>&quot;React&quot;</Str>);
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-sm">
        <button
          type="button"
          onClick={runBfs}
          disabled={!!wave}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-200 transition-colors hover:border-amber-300 hover:text-amber-200 disabled:opacity-40"
        >
          ▶ bfs(&quot;{g.nodes[start].label}&quot;)
        </button>
        <span className="min-w-0 flex-1 truncate text-slate-400">{info}</span>
      </div>

      <div ref={wrapRef} className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full min-w-[720px]"
          role="img"
          aria-label="Network graph of projects and the technologies they use"
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <pattern id="ds-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#ds-grid)" />

          {g.edges.map((e, i) => {
            const a = g.layout[e[0]];
            const b = g.layout[e[1]];
            const on = edgeOn(e);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                pathLength="1"
                className={`ds-edge ${inView ? "ds-edge-on" : ""}`}
                style={{ animationDelay: `${i * 35}ms`, transition: "stroke 0.3s, opacity 0.3s" }}
                stroke={on ? (wave ? "#fbbf24" : "#38bdf8") : "#475569"}
                strokeWidth={on ? 2.5 : 1.2}
                opacity={neighbourSet || wave ? (on ? 1 : 0.15) : 0.6}
              />
            );
          })}

          {g.nodes.map((n, i) => {
            const p = g.layout[i];
            const isProject = n.kind === "project";
            const r = isProject ? 11 : 7;
            const dim = vertexDim(i);
            return (
              <g key={n.id} transform={`translate(${p.x} ${p.y})`} opacity={dim ? 0.25 : 1} style={{ transition: "opacity 0.3s" }}>
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHover(i)}
                onClick={() => setStart(i)}
                style={{
                  opacity: inView ? undefined : 0,
                  animation: inView ? `ds-pop 500ms cubic-bezier(.2,.8,.2,1) ${300 + i * 40}ms both` : "none",
                }}
              >
                {i === start && <circle r={r + 7} fill="none" stroke="#fbbf24" strokeDasharray="3 3" strokeWidth="1.5" />}
                <circle r={r} fill={vertexColor(i)} stroke="#020617" strokeWidth="2" style={{ transition: "fill 0.4s" }} />
                <text
                  y={isProject ? -18 : 20}
                  textAnchor="middle"
                  className={isProject ? "fill-white font-sans" : "fill-slate-300 font-mono"}
                  fontSize={isProject ? 14 : 12}
                  fontWeight={isProject ? 700 : 400}
                  style={{ paintOrder: "stroke", stroke: "#020617", strokeWidth: 4 }}
                >
                  {n.label}
                </text>
              </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-5 font-mono text-xs text-slate-500">
        <span><span className="mr-1.5 inline-block h-3 w-3 rounded-full bg-sky-400 align-middle" />project</span>
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-violet-400 align-middle" />technology</span>
        <span><span className="mr-1.5 inline-block h-3 w-3 rounded-full border border-dashed border-amber-300 align-middle" />BFS start</span>
      </div>
    </Section>
  );
};

export default TechGraph;
