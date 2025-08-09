import { Position, Velocity } from "../types";

export const applyVelocity = (p: Position, v: Velocity) => ({
  x: p.x + v.vx,
  y: p.y + v.vy,
});

export const applyVelocities = (p: Position, vs: Velocity[]) =>
  vs.reduce((p: Position, v: Velocity) => applyVelocity(p, v), p);
