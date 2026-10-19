/* eslint-disable react/prop-types */
const PALETTE = {
  K: "#1a0d0d", // outline
  R: "#c8102e", // red armor
  D: "#7d0a1c", // dark red
  G: "#f4b400", // gold
  Y: "#ffd966", // light gold
  E: "#eaffff", // eyes
  C: "#6ff7ff", // chest light
};

const HEAD = [
  "....KKKKKKKK....",
  "...KRRRRRRRRK...",
  "..KRRRRRRRRRRK..",
  "..KRGGGGGGGGRK..",
  "..KRGEEGGEEGRK..",
  "..KRGGGGGGGGRK..",
  "..KRDGGKKGGDRK..",
  "...KRDGGGGDRK...",
  "....KKRRRRKK....",
];

const BODY = [
  "..KKRRRRRRRRKK..",
  ".KRRKRRCCRRKRRK.",
  "KRRGKRCCCCRKGRRK",
  "KRGGKRRCCRRKGGRK",
  "KRGKKRRRRRRKKGRK",
  "KRRK.KGGGGK.KRRK",
  "KYYK.KRRRRK.KYYK",
  ".KK..KRRRRK..KK.",
];

const LEGS_STAND = [
  "....KRRKKRRK....",
  "....KGGKKGGK....",
  "....KRRKKRRK....",
  "....KRRKKRRK....",
  "....KGGKKGGK....",
  "...KRRRKKRRRK...",
  "...KKKKKKKKKK...",
];

const LEGS_RUN = [
  "...KRRK..KRRK...",
  "..KGGK....KGGK..",
  "..KRRK....KRRK..",
  ".KRRK......KRRK.",
  ".KGGK......KGGK.",
  "KRRK........KRRK",
  "KKKK........KKKK",
];

const BODY_FLY = [
  "KK.KRRRRRRRRK.KK",
  "KRKKRRCCRRKKKRRK",
  "KRRKRCCCCRRKRRK.",
  ".KRKRRCCRRRKRK..",
  "..KKRRRRRRRKK...",
  ".....KGGGGK.....",
  ".....KRRRRK.....",
  ".....KRRRRK.....",
];

const FRAMES = {
  stand: [...HEAD, ...BODY, ...LEGS_STAND],
  run: [...HEAD, ...BODY, ...LEGS_RUN],
  fly: [...HEAD, ...BODY_FLY, ...LEGS_STAND],
};

const toRects = (rows) => {
  const rects = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (PALETTE[ch]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={PALETTE[ch]} />);
    });
  });
  return rects;
};

const RENDERED = Object.fromEntries(Object.entries(FRAMES).map(([k, rows]) => [k, toRects(rows)]));

export default function HeroSprite({ pose = "stand", facing = 1, thrusting = false, size = 2 }) {
  const rows = FRAMES[pose] || FRAMES.stand;
  const w = 16 * size;
  const h = rows.length * size;
  return (
    <div style={{ position: "relative", width: w, height: h, transform: facing < 0 ? "scaleX(-1)" : undefined }}>
      <svg width={w} height={h} viewBox={`0 0 16 ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true">
        {RENDERED[pose] || RENDERED.stand}
      </svg>
      {thrusting && (
        <>
          <span className="pq-flame" style={{ left: 4 * size, top: h - size }} />
          <span className="pq-flame" style={{ left: 9 * size, top: h - size }} />
        </>
      )}
    </div>
  );
}
