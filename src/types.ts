export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type GameState = "running" | "paused" | "upgrading" | "defeat";

export type Enemy = {
  id: string;
  position: Position;
  speed: number;
  size: number;
  health: number;
  color: string;
  /** How many points is this enemy worth when destroyed */
  points: number;
  /** Is this enemy an upgrade trigger? */
  isUpgradeTrigger: boolean;
};

export type Bullet = {
  id: string;
  position: Position;
  angle: number;
  damage: number;
};

export type Explosion = {
  id: string;
  position: Position;
  color: string;
  /** When did this explosion start? */
  startTime: number;
  /** How long will this explosion last? */
  duration: number;
};
