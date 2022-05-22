import { atom, useRecoilValue } from "recoil";
import { useScreen } from "./screen";

const DEFAULT_HEALTH = 100;
export const DEFAULT_TOWER_HEALTH = DEFAULT_HEALTH;

export const healthState = atom<number>({
  key: "tower/health",
  default: DEFAULT_HEALTH,
});

export const useTowerHealth = () => useRecoilValue(healthState);

export const useTowerPosition = () => {
  const screen = useScreen();
  const x = screen.width / 2;
  const y = screen.height / 2;

  return { x, y };
};

export const regenerationRateState = atom<number>({
  key: "tower/regenerationRate",
  default: 0,
});

export const maxHealthState = atom<number>({
  key: "tower/maxHealth",
  default: DEFAULT_HEALTH,
});

export const rateOfFireState = atom<number>({
  key: "tower/rateOfFire",
  default: 1,
});

export const targetingRangeState = atom<number>({
  key: "tower/targetingRange",
  default: 200,
});

export const useTargetingRange = () => useRecoilValue(targetingRangeState);
