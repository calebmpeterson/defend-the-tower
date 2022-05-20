import { atom, useRecoilValue } from "recoil";

const DEFAULT_HEALTH = 100;
export const DEFAULT_TOWER_HEALTH = DEFAULT_HEALTH;

export const healthState = atom<number>({
  key: "tower/health",
  default: DEFAULT_HEALTH,
});

export const useTowerHealth = () => useRecoilValue(healthState);

export const regenerationRateState = atom<number>({
  key: "tower/regenerationRate",
  default: 0,
});

export const maxHealthState = atom<number>({
  key: "tower/maxHealth",
  default: DEFAULT_HEALTH,
});

export const useTowerHealthMax = () => useRecoilValue(maxHealthState);

export const rateOfFireState = atom<number>({
  key: "tower/rateOfFire",
  default: 1,
});
