export const WORLD_H = 540;
export const GROUND_Y = 460;

export const PHYS = {
  gravity: 2200,
  run: 330,
  accelGround: 2600,
  accelAir: 1700,
  jumpV: 830, // jump height ≈ jumpV² / (2 · gravity) ≈ 156px
  jumpCut: 320, // releasing jump early gives a short hop
  thrust: 3300, // armor thrusters (hold jump in the air)
  maxRise: 360,
  fuelMax: 0.9, // seconds of flight, refills on the ground
  coyote: 0.08,
  buffer: 0.12,
};

export const PLAYER_W = 28;
export const PLAYER_H = 46;

export function createPlayer(x) {
  return {
    x, y: GROUND_Y - PLAYER_H, w: PLAYER_W, h: PLAYER_H,
    vx: 0, vy: 0, onGround: true, facing: 1,
    fuel: PHYS.fuelMax, coyote: 0, buffer: 0, thrusting: false,
  };
}

export const overlaps = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

export function stepPlayer(p, input, solids, dt, worldW) {
  const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  const target = dir * PHYS.run;
  const accel = p.onGround ? PHYS.accelGround : PHYS.accelAir;
  if (p.vx < target) p.vx = Math.min(target, p.vx + accel * dt);
  else if (p.vx > target) p.vx = Math.max(target, p.vx - accel * dt);
  if (dir) p.facing = dir;

  p.coyote = p.onGround ? PHYS.coyote : Math.max(0, p.coyote - dt);
  if (input.jumpPressed) p.buffer = PHYS.buffer;
  else p.buffer = Math.max(0, p.buffer - dt);

  if (p.buffer > 0 && p.coyote > 0) {
    p.vy = -PHYS.jumpV;
    p.buffer = 0;
    p.coyote = 0;
    p.onGround = false;
  }

  p.thrusting = input.jump && !p.onGround && p.fuel > 0 && (p.thrusting || p.vy > -60);
  if (!input.jump && !p.thrusting && p.vy < -PHYS.jumpCut) p.vy = -PHYS.jumpCut;

  p.vy += PHYS.gravity * dt;
  if (p.thrusting) {
    p.vy -= PHYS.thrust * dt;
    if (p.vy < -PHYS.maxRise) p.vy = -PHYS.maxRise;
    p.fuel = Math.max(0, p.fuel - dt);
  }
  if (p.vy > 1400) p.vy = 1400;

  p.x += p.vx * dt;
  for (const s of solids) {
    if (s.type === "pad" || !overlaps(p, s)) continue;
    if (p.vx > 0) p.x = s.x - p.w;
    else if (p.vx < 0) p.x = s.x + s.w;
    p.vx = 0;
  }
  p.x = Math.max(0, Math.min(worldW - p.w, p.x));

  const prevBottom = p.y + p.h;
  p.y += p.vy * dt;
  if (p.y < -200) p.y = -200;
  p.onGround = false;
  let hit = null;
  const touching = solids.filter(
    (s) => overlaps(p, s) && (s.type !== "pad" || (p.vy > 0 && prevBottom <= s.y + 0.5))
  );
  if (touching.length) {
    if (p.vy > 0) {
      p.y = Math.min(...touching.map((s) => s.y)) - p.h;
      p.onGround = true;
      p.vy = 0;
    } else if (p.vy < 0) {
      p.y = Math.max(...touching.map((s) => s.y + s.h));
      p.vy = 0;
      p.thrusting = false;
      const cx = p.x + p.w / 2;
      hit = touching.reduce((best, s) =>
        Math.abs(cx - (s.x + s.w / 2)) < Math.abs(cx - (best.x + best.w / 2)) ? s : best
      );
    }
  }

  if (p.onGround) p.fuel = Math.min(PHYS.fuelMax, p.fuel + dt * 1.5);
  return hit;
}
