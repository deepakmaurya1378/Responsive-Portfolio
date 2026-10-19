const PALETTE = { K: "#12001f", R: "#ff2e88", W: "#ffffff", G: "#ffd23f" };

const ROWS = [
  "..K.........K..",
  "...K.......K...",
  "....KKKKKKK....",
  "...KRRRRRRRK...",
  "..KRRWKRKWRRK..",
  "K.KRRRRKRRRRK.K",
  ".KKRRGRKRGRRKK.",
  "K.KRRRRKRRRRK.K",
  "..KRRRRKRRRRK..",
  "...KKKKKKKKK...",
  "..K..K...K..K..",
];

const RECTS = ROWS.flatMap((row, y) =>
  [...row].map((ch, x) =>
    PALETTE[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={PALETTE[ch]} /> : null
  )
);

export default function BugSprite() {
  return (
    <svg width="30" height="22" viewBox="0 0 15 11" shapeRendering="crispEdges" aria-hidden="true">
      {RECTS}
    </svg>
  );
}
