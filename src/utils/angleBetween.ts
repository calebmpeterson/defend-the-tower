import { Position } from "../types";

export const angleBetween = (p1: Position, p2: Position) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const angle = Math.atan2(dy, dx);

  return angle;
};
