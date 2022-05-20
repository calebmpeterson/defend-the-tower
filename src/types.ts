export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type GameState = "running" | "paused" | "defeat";

export type Enemy = {
  id: string;
  position: Position;
  speed: number;
  size: number;
  health: number;
  color: string;
  /** How many points is this enemy worth when destroyed */
  points: number;
};

export type Bullet = {
  id: string;
  position: Position;
  angle: number;
  damage: number;
};
