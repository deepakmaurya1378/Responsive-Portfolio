/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import HeroSprite from "./HeroSprite";
import BugSprite from "./BugSprite";
import RevealPanel from "./RevealPanel";
import { fileName } from "./files";
import { buildLevel, TILE } from "./level";
import { createPlayer, stepPlayer, overlaps, WORLD_H, GROUND_Y, PHYS } from "./physics";
import { profile, skillGroups } from "../data/portfolio";
import "./game.css";

const level = buildLevel();
const TOTAL = level.items.length;
const SKILL_COUNT = skillGroups.reduce((n, g) => n + g.skills.length, 0);

const STORE_KEY = "pq-progress-v1";
const loadProgress = () => {
  try {
    const ids = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    return new Set(ids.filter((id) => level.itemById[id]));
  } catch {
    return new Set();
  }
};
const saveProgress = (set) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify([...set]));
  } catch {
    /* storage blocked — progress just won't be remembered */
  }
};

const KEYS = {
  ArrowLeft: "left", KeyA: "left",
  ArrowRight: "right", KeyD: "right",
  ArrowUp: "jump", KeyW: "jump", Space: "jump",
};
const isTyping = (el) =>
  el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);

const BOOT_LINES = [
  "> booting PORTFOLIO_OS v26.10 ...",
  "> loading armor_suit.sys ............ [ OK ]",
  `> indexing ${SKILL_COUNT} skills ................ [ OK ]`,
  "> mounting ~/experience ~/projects .. [ OK ]",
  "> scanning for bugs ................. [ FOUND ]",
  `> ${TOTAL} data nodes encrypted. decrypt them all.`,
];

const SKYLINE_FAR = Array.from({ length: 40 }, (_, i) => ({ x: i * 62 + ((i * 37) % 30), w: 40 + ((i * 53) % 50), h: 90 + ((i * 71) % 170) }));
const SKYLINE_NEAR = Array.from({ length: 34 }, (_, i) => ({ x: i * 150 + ((i * 59) % 60), w: 70 + ((i * 41) % 60), h: 120 + ((i * 89) % 160), sign: i % 4 === 1 }));
const fresh = () => level.bugs.map((b) => ({ ...b }));

// Where the hero is, plus bits and bugs, saved for this tab so a refresh resumes the run.
const SESSION_KEY = "pq-session";
const loadSession = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
};
const startPlayer = (saved) => {
  const p = createPlayer(level.spawnX);
  if (saved?.x != null) {
    p.x = Math.max(0, Math.min(level.worldW - p.w, saved.x));
    p.y = Math.min(saved.y, GROUND_Y - p.h);
  }
  return p;
};

export default function Game({ onClassic }) {
  const [saved] = useState(loadSession);
  const [started, setStarted] = useState(() => !!saved?.started);
  const [bootStep, setBootStep] = useState(0);
  const [revealed, setRevealed] = useState(loadProgress);
  const [bitsTaken, setBitsTaken] = useState(() => new Set(saved?.bits || []));
  const [bugsFixed, setBugsFixed] = useState(() => new Set(saved?.bugs || []));
  const [open, setOpen] = useState(null); // { item, isNew }
  const [journal, setJournal] = useState(false);
  const [zoneKey, setZoneKey] = useState("boot");
  const [pose, setPose] = useState({ pose: "stand", facing: 1, thrusting: false });
  const [bump, setBump] = useState(null);
  const [pops, setPops] = useState([]);
  const [fuel, setFuel] = useState(1);
  const [hurt, setHurt] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [toast, setToast] = useState(null);
  const [view, setView] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [touchUI] = useState(() => window.matchMedia?.("(pointer: coarse)").matches ?? false);

  const showPads = touchUI || view.w < 768;
  const portrait = showPads && view.h > view.w;
  const compactHud = view.w < 640 || view.h < 500;
  const HUD_H = compactHud ? 44 : 56;
  const DOCK_H = portrait ? Math.min(170, Math.round(view.h * 0.2)) : 0;
  const scale = portrait
    ? Math.min((view.h - DOCK_H - HUD_H) / WORLD_H, view.w / 420)
    : Math.min(view.h / WORLD_H, view.w / 600);
  const logicalW = view.w / scale;

  const player = useRef(startPlayer(saved));
  const input = useRef({ left: false, right: false, jump: false, jumpPressed: false });
  const bugs = useRef(fresh());
  const bugEls = useRef([]);
  const worldRef = useRef(null);
  const playerRef = useRef(null);
  const farRef = useRef(null);
  const nearRef = useRef(null);
  const revealedRef = useRef(revealed);
  const bitsRef = useRef(bitsTaken);
  const fixedRef = useRef(bugsFixed);
  const pausedRef = useRef(true);
  const startedRef = useRef(started);
  const viewRef = useRef(logicalW);
  const hitRef = useRef(null);
  const beaconRef = useRef(null);
  const stompRef = useRef(null);
  const hurtRef = useRef(null);

  useEffect(() => {
    pausedRef.current = !started || !!open || journal;
    startedRef.current = started;
  }, [started, open, journal]);
  useEffect(() => {
    viewRef.current = logicalW;
  }, [logicalW]);

  useEffect(() => {
    if (import.meta.env.DEV) window.__pq = { player, level, input, bugs };
  }, []);

  useEffect(() => {
    const save = () => {
      try {
        const p = player.current;
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ x: p.x, y: p.y, started: startedRef.current, bits: [...bitsRef.current], bugs: [...fixedRef.current] })
        );
      } catch {
        /* storage blocked */
      }
    };
    const t = setInterval(save, 1000);
    window.addEventListener('pagehide', save);
    return () => {
      save();
      clearInterval(t);
      window.removeEventListener('pagehide', save);
    };
  }, []);

  useEffect(() => {
    const onResize = () => setView({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (started || bootStep > BOOT_LINES.length) return;
    const t = setTimeout(() => setBootStep((s) => s + 1), bootStep === 0 ? 250 : 320);
    return () => clearTimeout(t);
  }, [bootStep, started]);

  const releaseKeys = () => {
    input.current = { left: false, right: false, jump: false, jumpPressed: false };
  };

  const addPop = (x, y, text, tone) => {
    const k = performance.now() + Math.random();
    setPops((list) => [...list.slice(-4), { x, y, text, tone, k }]);
    setTimeout(() => setPops((list) => list.filter((p) => p.k !== k)), 900);
  };

  const unlock = useCallback((id) => {
    if (revealedRef.current.has(id)) return false;
    const next = new Set(revealedRef.current).add(id);
    revealedRef.current = next;
    setRevealed(next);
    saveProgress(next);
    if (next.size === TOTAL) {
      setToast("ALL NODES DECRYPTED · 100% COMPLETE");
      setTimeout(() => setToast(null), 4500);
    }
    return true;
  }, []);

  hitRef.current = (b) => {
    setBump({ id: b.itemId, k: performance.now() });
    if (!unlock(b.itemId)) return;
    addPop(b.x + TILE / 2, b.y - 16, "DECRYPTED", "cyan");
    releaseKeys();
    pausedRef.current = true;
    setTimeout(() => setOpen({ item: level.itemById[b.itemId], isNew: true }), 420);
  };

  beaconRef.current = () => {
    setDeployed(true);
    const isNew = unlock(level.beacon.itemId);
    releaseKeys();
    pausedRef.current = true;
    setTimeout(() => setOpen({ item: level.itemById[level.beacon.itemId], isNew }), 750);
  };

  stompRef.current = (i, b) => {
    fixedRef.current = new Set(fixedRef.current).add(i);
    setBugsFixed(fixedRef.current);
    addPop(b.x + b.w / 2, b.y - 20, "BUG FIXED", "green");
  };

  hurtRef.current = () => {
    setHurt(true);
    setTimeout(() => setHurt(false), 800);
  };

  useEffect(() => {
    let raf;
    let last = performance.now();
    let lastPose = "";
    let lastZone = "boot";
    let lastFuel = 1;
    let inBeacon = false;
    let stride = 0;
    let hurtT = 0;

    const tick = (t) => {
      const dt = Math.min((t - last) / 1000, 1 / 30);
      last = t;
      const p = player.current;

      if (!pausedRef.current) {
        for (let i = 0; i < 2; i++) {
          const hit = stepPlayer(p, input.current, level.solids, dt / 2, level.worldW);
          input.current.jumpPressed = false;
          if (hit?.type === "block") hitRef.current(hit);
          if (pausedRef.current) break;
        }

        level.bits.forEach((c, i) => {
          if (!bitsRef.current.has(i) && overlaps(p, c)) {
            bitsRef.current = new Set(bitsRef.current).add(i);
            setBitsTaken(bitsRef.current);
          }
        });

        hurtT = Math.max(0, hurtT - dt);
        bugs.current.forEach((b, i) => {
          if (fixedRef.current.has(i)) return;
          b.x += b.dir * 60 * dt;
          if (b.x < b.minX) { b.x = b.minX; b.dir = 1; }
          if (b.x > b.maxX) { b.x = b.maxX; b.dir = -1; }
          if (!overlaps(p, b)) return;
          if (p.vy >= 0 && p.y + p.h - b.y < 16) {
            p.vy = -560;
            p.onGround = false;
            stompRef.current(i, b);
          } else if (hurtT === 0) {
            p.vx = (p.x + p.w / 2 < b.x + b.w / 2 ? -1 : 1) * 520;
            p.vy = -380;
            p.onGround = false;
            hurtT = 0.8;
            hurtRef.current();
          }
        });

        const touchingBeacon = overlaps(p, level.beacon);
        if (touchingBeacon && !inBeacon) beaconRef.current();
        inBeacon = touchingBeacon;

        const cx = p.x + p.w / 2;
        const z = level.zones.find((zz) => cx >= zz.start && cx < zz.end)?.key;
        if (z && z !== lastZone) {
          lastZone = z;
          setZoneKey(z);
        }

        stride += (dt * Math.abs(p.vx)) / 45;
        let ps = "stand";
        if (!p.onGround) ps = p.thrusting ? "fly" : "run";
        else if (Math.abs(p.vx) > 20) ps = Math.floor(stride) % 2 ? "run" : "stand";
        const key = `${ps}${p.facing}${p.thrusting}`;
        if (key !== lastPose) {
          lastPose = key;
          setPose({ pose: ps, facing: p.facing, thrusting: p.thrusting });
        }
        const f = Math.round((p.fuel / PHYS.fuelMax) * 10) / 10;
        if (f !== lastFuel) {
          lastFuel = f;
          setFuel(f);
        }
      }

      const vw = viewRef.current;
      const camX = Math.max(0, Math.min(level.worldW - vw, p.x - vw * 0.38));
      if (worldRef.current) worldRef.current.style.transform = `translate3d(${-camX}px,0,0)`;
      if (farRef.current) farRef.current.style.transform = `translate3d(${-camX * 0.12}px,0,0)`;
      if (nearRef.current) nearRef.current.style.transform = `translate3d(${-camX * 0.4}px,0,0)`;
      if (playerRef.current) playerRef.current.style.transform = `translate3d(${p.x - 2}px,${p.y - 2}px,0)`;
      bugs.current.forEach((b, i) => {
        const el = bugEls.current[i];
        if (el) el.style.transform = `translate3d(${b.x}px,${b.y}px,0) scaleX(${b.dir})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(null);
    setDeployed(false);
  }, []);

  useEffect(() => {
    const down = (e) => {
      if (isTyping(e.target)) return;
      if (!started) {
        if (e.code === "Enter" || e.code === "Space") {
          e.preventDefault();
          setStarted(true);
        }
        return;
      }
      if (open || journal) {
        if (e.code === "Escape") {
          if (open) closePanel();
          else setJournal(false);
        }
        return;
      }
      if (e.code === "KeyJ") {
        releaseKeys();
        setJournal(true);
        return;
      }
      const k = KEYS[e.code];
      if (!k) return;
      e.preventDefault();
      if (k === "jump" && !input.current.jump) input.current.jumpPressed = true;
      input.current[k] = true;
    };
    const up = (e) => {
      const k = KEYS[e.code];
      if (k) input.current[k] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", releaseKeys);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", releaseKeys);
    };
  }, [started, open, journal, closePanel]);

  const hold = (k) => ({
    onPointerDown: (e) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture?.(e.pointerId);
      if (k === "jump" && !input.current.jump) input.current.jumpPressed = true;
      input.current[k] = true;
    },
    onPointerUp: () => (input.current[k] = false),
    onPointerCancel: () => (input.current[k] = false),
    onLostPointerCapture: () => (input.current[k] = false),
    onContextMenu: (e) => e.preventDefault(),
  });

  const openItem = (id) => {
    releaseKeys();
    setJournal(false);
    setOpen({ item: level.itemById[id], isNew: false });
  };

  const unlockAll = () => {
    const all = new Set(level.items.map((it) => it.id));
    revealedRef.current = all;
    setRevealed(all);
    saveProgress(all);
  };

  const resetProgress = () => {
    const none = new Set();
    revealedRef.current = none;
    setRevealed(none);
    saveProgress(none);
    bitsRef.current = new Set();
    setBitsTaken(bitsRef.current);
    fixedRef.current = new Set();
    setBugsFixed(fixedRef.current);
    bugs.current = fresh();
    player.current = createPlayer(level.spawnX);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* storage blocked */
    }
  };

  const zone = level.zones.find((z) => z.key === zoneKey) || level.zones[0];
  const pad2 = (n) => String(n).padStart(2, "0");

  return (
    <div className="pq-root">
      <div className="pq-sun" />

      <div className="pq-stage" style={{ width: logicalW, height: WORLD_H, bottom: DOCK_H, transform: `scale(${scale})` }}>
        <div ref={farRef} className="pq-layer">
          {SKYLINE_FAR.map((b, i) => (
            <div key={i} className="pq-bldg-far" style={{ left: b.x, width: b.w, height: b.h, top: GROUND_Y - b.h }} />
          ))}
        </div>
        <div ref={nearRef} className="pq-layer">
          {SKYLINE_NEAR.map((b, i) => (
            <div key={i} className="pq-bldg" style={{ left: b.x, width: b.w, height: b.h, top: GROUND_Y - b.h }}>
              {b.sign && <span className="pq-bldg-sign" />}
            </div>
          ))}
        </div>

        <div ref={worldRef} className="pq-world" style={{ width: level.worldW, height: WORLD_H }}>
          <div className="pq-ground" style={{ left: 0, top: GROUND_Y, width: level.worldW, height: WORLD_H - GROUND_Y }} />

          {level.signs.map((s, i) => {
            if (s.type === "intro")
              return (
                <div key={i} className="pq-term pq-mono" style={portrait ? { left: 16, top: 70, width: 460, transform: "scale(0.84)", transformOrigin: "top left" } : { left: s.x, top: 64, width: 460 }}>
                  <div className="pq-term-bar">
                    <span /><span /><span />
                    <em>deepak@portfolio: ~</em>
                  </div>
                  <div className="pq-term-body">
                    <p><b>$</b> whoami</p>
                    <p className="pq-out">{profile.name.toLowerCase()} · {profile.role.toLowerCase()}</p>
                    <p><b>$</b> ./controls --help</p>
                    <p className="pq-out">← → / A D ....... move</p>
                    <p className="pq-out">SPACE / ↑ ....... jump</p>
                    <p className="pq-out">hold jump ....... fly (thrusters)</p>
                    <p className="pq-out">land on bugs .... fix them</p>
                    <p className="pq-out">J ............... file system</p>
                    <p><b>$</b> hack the data nodes from below →<span className="pq-cursor" /></p>
                  </div>
                </div>
              );
            if (s.type === "zone")
              return (
                <div key={i} className="pq-holo pq-mono" style={{ left: s.x, top: GROUND_Y - 150, height: 150 }}>
                  <div className="pq-holo-screen">
                    <p className="pq-holo-sector">SECTOR {s.sector}</p>
                    <p>$ cd {s.path}</p>
                  </div>
                  <div className="pq-holo-beam" />
                  <div className="pq-holo-base" />
                </div>
              );
            if (s.type === "hint")
              return (
                <div key={i} className="pq-holo pq-mono" style={{ left: s.x, top: GROUND_Y - 130, height: 130 }}>
                  <div className="pq-holo-screen pq-holo-warn">
                    <p>{s.text}</p>
                  </div>
                  <div className="pq-holo-beam" />
                  <div className="pq-holo-base" />
                </div>
              );
            return (
              <div key={i} className="pq-mainframe" style={{ left: s.x, top: GROUND_Y - 300 }}>
                <div className="pq-mainframe-sign pq-mono">MAINFRAME</div>
                <div className="pq-mainframe-door" />
              </div>
            );
          })}

          <div className={`pq-beacon ${deployed ? "pq-beacon-on" : ""}`} style={{ left: level.beacon.beamX, top: 0, height: GROUND_Y }}>
            <div className="pq-beacon-label pq-mono">{deployed ? "DEPLOYED ✓" : "DEPLOY ▼"}</div>
            <div className="pq-beacon-beam" />
            <div className="pq-beacon-base" />
          </div>

          {level.solids.map((s, i) => {
            if (s.type === "ground") return null;
            if (s.type === "tower")
              return (
                <div key={i} className="pq-tower" style={{ left: s.x, top: s.y, width: s.w, height: s.h }}>
                  <span className="pq-tower-led" />
                </div>
              );
            if (s.type === "pad") return <div key={i} className="pq-pad-platform" style={{ left: s.x, top: s.y, width: s.w }} />;
            const used = revealed.has(s.itemId);
            const bumping = bump?.id === s.itemId;
            return (
              <div
                key={bumping ? `${i}-${bump.k}` : i}
                className={`pq-node pq-mono ${used ? "pq-node-used" : s.variant === "star" ? "pq-node-star" : ""} ${bumping ? "pq-bump" : ""}`}
                style={{ left: s.x, top: s.y }}
              >
                {used ? "✓" : s.variant === "star" ? "★" : "{ }"}
              </div>
            );
          })}

          {level.blocks.map((b) =>
            revealed.has(b.itemId) ? (
              <button
                key={`label-${b.itemId}`}
                type="button"
                className="pq-label pq-mono"
                style={{ left: b.x + TILE / 2, top: b.y - 26 - b.labelLift }}
                onClick={() => openItem(b.itemId)}
              >
                {fileName(level.itemById[b.itemId])}
              </button>
            ) : null
          )}

          {level.bits.map((c, i) =>
            bitsTaken.has(i) ? null : (
              <div key={i} className="pq-bit pq-mono" style={{ left: c.x, top: c.y }}>
                {c.v ? "1" : "0"}
              </div>
            )
          )}

          {level.bugs.map((b, i) => (
            <div
              key={i}
              ref={(el) => (bugEls.current[i] = el)}
              className={`pq-bug ${bugsFixed.has(i) ? "pq-bug-fixed" : ""}`}
            >
              <BugSprite />
            </div>
          ))}

          {pops.map((p) => (
            <div key={p.k} className={`pq-pop pq-mono pq-pop-${p.tone}`} style={{ left: p.x, top: p.y }}>
              {p.text}
            </div>
          ))}

          <div ref={playerRef} className={`pq-player ${hurt ? "pq-hurt" : ""}`}>
            <HeroSprite {...pose} />
          </div>
        </div>
      </div>

      <div className="pq-scanlines" />

      <div className={`pq-hud pq-mono ${compactHud ? "pq-hud-compact" : ""}`} style={{ height: HUD_H }}>
        <p className="pq-prompt">
          {!compactHud && "deepak@portfolio:"}
          <span>{zone.key === "boot" ? "~" : `~/${zone.key}`}</span>$<span className="pq-cursor" />
        </p>
        <div className="pq-stats">
          <p title="Bits collected">{compactHud ? "◆" : "BITS"} <b>{pad2(bitsTaken.size)}</b></p>
          <p title="Bugs fixed">{compactHud ? "🐞" : "BUGS FIXED"} <b>{pad2(bugsFixed.size)}</b></p>
          <p title="Data decrypted">{compactHud ? "▣" : "DATA"} <b>{pad2(revealed.size)}/{TOTAL}</b></p>
          {!compactHud && (
            <div className="flex items-center gap-2">
              THRUST
              <div className="pq-fuel"><div style={{ width: `${fuel * 100}%` }} /></div>
            </div>
          )}
          <button type="button" className="pq-btn pq-btn-sm" onClick={() => { releaseKeys(); setJournal(true); }}>
            FILES
          </button>
          <button type="button" className="pq-btn pq-btn-sm pq-btn-ghost" onClick={onClassic} aria-label="Classic view">
            {compactHud ? "EXIT" : "CLASSIC VIEW"}
          </button>
        </div>
      </div>

      {toast && <div className="pq-toast pq-mono">{toast}</div>}

      {showPads && started && !open && !journal && (
        <div className={portrait ? "pq-dock" : "pq-touch"} style={portrait ? { height: DOCK_H } : undefined}>
          <div className="pq-dpad">
            <button type="button" className="pq-pad" aria-label="Move left" {...hold("left")}>{"◀︎"}</button>
            <button type="button" className="pq-pad" aria-label="Move right" {...hold("right")}>{"▶︎"}</button>
          </div>
          {portrait && (
            <div className="pq-dock-fuel pq-mono">
              <span>THRUST</span>
              <div className="pq-fuel"><div style={{ width: `${fuel * 100}%` }} /></div>
            </div>
          )}
          <button type="button" className="pq-pad pq-pad-jump pq-mono" aria-label="Jump (hold to fly)" {...hold("jump")}>JUMP</button>
        </div>
      )}

      {open && <RevealPanel item={open.item} isNew={open.isNew} onClose={closePanel} />}

      {journal && (
        <div className="pq-overlay" onClick={() => setJournal(false)}>
          <div className="pq-panel" role="dialog" aria-modal="true" aria-label="File system" onClick={(e) => e.stopPropagation()}>
            <div className="pq-term-bar pq-mono">
              <span /><span /><span />
              <em>~/portfolio — ls -R</em>
              <button type="button" className="pq-close" onClick={() => setJournal(false)} aria-label="Close">✕</button>
            </div>
            <div className="pq-panel-body">
              <p className="pq-mono text-lg text-cyan-300">
                {revealed.size}/{TOTAL} files decrypted
              </p>
              {level.zones.map((z) => {
                const list = level.items.filter((it) => it.zone === z.key);
                if (!list.length) return null;
                return (
                  <div key={z.key} className="mt-5">
                    <p className="pq-mono text-base text-fuchsia-300">{z.key === "boot" ? "~/" : `~/${z.key}/`}</p>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {list.map((it) =>
                        revealed.has(it.id) ? (
                          <button key={it.id} type="button" className="pq-file pq-mono" onClick={() => openItem(it.id)}>
                            <span className="text-emerald-300">✓</span> {fileName(it)}
                          </button>
                        ) : (
                          <div key={it.id} className="pq-file pq-file-locked pq-mono">
                            <span>🔒</span> ████████ <span className="text-xs">[encrypted]</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-wrap gap-3 justify-end mt-6">
                <button type="button" className="pq-btn pq-btn-sm" onClick={unlockAll}>decrypt --all</button>
                <button type="button" className="pq-btn pq-btn-sm pq-btn-ghost" onClick={resetProgress}>reset progress</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!started && (
        <div className="pq-start">
          <div className="pq-boot pq-mono">
            {BOOT_LINES.slice(0, bootStep).map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <h1 className="pq-title pq-mono" data-text="PORTFOLIO.EXE">PORTFOLIO.EXE</h1>
          <p className="pq-mono text-lg md:text-xl text-slate-300 mt-1">a playable portfolio by {profile.name}</p>
          <div className="my-6 pq-float">
            <HeroSprite pose="fly" thrusting size={5} />
          </div>
          <button type="button" className="pq-btn" onClick={() => setStarted(true)} autoFocus>
            {revealed.size ? `▶ RESUME SESSION (${revealed.size}/${TOTAL})` : "▶ RUN PORTFOLIO.EXE"}
          </button>
          {!touchUI && <p className="pq-mono text-sm text-slate-400 mt-3">press ENTER to start</p>}
          <button type="button" className="pq-link mt-6" onClick={onClassic}>
            Prefer a normal website? Open the classic view
          </button>
        </div>
      )}
    </div>
  );
}
