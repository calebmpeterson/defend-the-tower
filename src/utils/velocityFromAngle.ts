import { Velocity } from "../types";

export const velocityFromAngle = (
  angle: number,
  speed: number,
  deltaT: number
): Velocity => {
  const vx = (speed * deltaT * Math.cos(angle)) / 1000;
  const vy = (speed * deltaT * Math.sin(angle)) / 1000;

  return { vx, vy };
};
