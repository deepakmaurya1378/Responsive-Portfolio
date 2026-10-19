import { profile, jobs, education, skillGroups, projects } from "../data/portfolio";
import { GROUND_Y } from "./physics";

export const TILE = 44;
const LOW = 300; // top of a node you can hack with a normal jump from the ground

export function buildLevel() {
  const items = [];
  const solids = [];
  const blocks = [];
  const bits = [];
  const bugs = [];
  const signs = [];
  const zones = [];
  const worldW = 8800;
  solids.push({ x: 0, y: GROUND_Y, w: worldW, h: 200, type: "ground" });

  const item = (kind, title, data, zone) => {
    const it = { id: `${kind}-${items.length}`, kind, title, data, zone };
    items.push(it);
    return it;
  };
  const node = (x, y, it, variant = "node", labelLift = 0) => {
    const b = { x, y, w: TILE, h: TILE, type: "block", itemId: it.id, variant, labelLift };
    solids.push(b);
    blocks.push(b);
  };
  const pad = (x, y, w) => solids.push({ x, y, w, h: 14, type: "pad" });
  const tower = (x, h) => solids.push({ x, y: GROUND_Y - h, w: 76, h, type: "tower" });
  const bitRow = (x, y, n, gap = 40) => {
    for (let i = 0; i < n; i++) bits.push({ x: x + i * gap, y, w: 16, h: 22, v: (x + i) % 2 });
  };
  const bug = (minX, maxX) => bugs.push({ x: minX, y: GROUND_Y - 22, w: 30, h: 22, minX, maxX, dir: 1 });
  const zone = (key, sector, name, start, end) => {
    zones.push({ key, sector, name, start, end });
    signs.push({ type: "zone", x: start + 50, sector, path: `~/${key}` });
  };

  zones.push({ key: "boot", sector: "00", name: "BOOT", start: 0, end: 1150 });
  signs.push({ type: "intro", x: 150 });
  const prof = item("profile", "whoami", profile, "boot");
  node(720, LOW, prof);
  bitRow(860, 400, 5);

  zone("experience", "01", "EXPERIENCE", 1150, 2500);
  const jobItems = jobs.map((j) => item("job", j.company, j, "experience"));
  node(1500, LOW, jobItems[0]);
  bug(1560, 1690);
  tower(1720, 110);
  bitRow(1735, 310, 2);
  pad(1900, 330, 176);
  node(1966, 190, jobItems[1]);
  bitRow(1915, 290, 4);
  bug(2010, 2220);
  tower(2250, 150);

  zone("education", "02", "EDUCATION", 2500, 3500);
  const eduItems = education.map((e) => item("education", e.title, e, "education"));
  bug(2580, 2740);
  pad(2750, 360, 132);
  node(2794, 220, eduItems[0]);
  pad(2980, 300, 132);
  node(3024, 160, eduItems[1]);
  pad(3210, 240, 132);
  node(3254, 100, eduItems[2]);
  bitRow(2765, 320, 3);
  bitRow(2995, 260, 3);
  bitRow(3225, 200, 3);

  zone("skills", "03", "SKILLS", 3500, 5400);
  const skillItems = skillGroups.map((g) => item("skills", g.title, g, "skills"));
  node(3800, LOW, skillItems[0]);
  node(3950, LOW, skillItems[1]);
  bug(3830, 4060);
  tower(4080, 90);
  pad(4200, 330, 264);
  node(4244, 190, skillItems[2]);
  node(4376, 190, skillItems[3], "node", 26);
  bitRow(4260, 290, 4);
  node(4620, LOW, skillItems[4]);
  node(4770, LOW, skillItems[5]);
  bug(4500, 4850);
  signs.push({ type: "hint", x: 4880, text: "$ sudo fly --hold-jump" });
  pad(5050, 260, 176);
  node(5116, 120, skillItems[6]);
  bitRow(5240, 400, 3);

  zone("projects", "04", "PROJECTS", 5400, 7700);
  const projItems = projects.map((p) => item("project", p.title, p, "projects"));
  const feat = projItems.filter((it) => it.data.featured);
  const mini = projItems.filter((it) => !it.data.featured);
  [[5700, 120], [6000, 130], [6300, 120]].forEach(([x, h], i) => {
    tower(x, h);
    node(x + 16, GROUND_Y - h - 160, feat[i], "star");
  });
  bug(5800, 5980);
  bug(6100, 6280);
  bitRow(6400, 400, 3);
  pad(6550, 330, 220);
  node(6594, 190, mini[0]);
  node(6726, 190, mini[1], "node", 26); // lifted label so it doesn't overlap its neighbour
  bug(6790, 6930);
  node(6950, LOW, mini[2]);
  pad(7150, 270, 176);
  node(7216, 130, mini[3]);
  bug(7300, 7470);
  node(7500, LOW, mini[4]);

  zone("contact", "05", "MAINFRAME", 7700, 8800);
  const contact = item("contact", "Contact & Resume", profile, "contact");
  bug(7720, 7840);
  pad(7880, 380, 110);
  pad(8010, 320, 110);
  pad(8140, 260, 110);
  bitRow(7900, 340, 2);
  bitRow(8030, 280, 2);
  bitRow(8160, 220, 2);
  const beacon = { x: 8270, y: 0, w: 70, h: GROUND_Y, beamX: 8290, itemId: contact.id };
  signs.push({ type: "mainframe", x: 8420 });

  return {
    worldW,
    spawnX: 70,
    items,
    itemById: Object.fromEntries(items.map((it) => [it.id, it])),
    solids,
    blocks,
    bits,
    bugs,
    signs,
    zones,
    beacon,
  };
}
