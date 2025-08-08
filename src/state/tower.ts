import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Position } from "../types";

const DEFAULT_HEALTH = 100;
const DEFAULT_SPEED = 125;
export const DEFAULT_TOWER_HEALTH = DEFAULT_HEALTH;

export const healthState = atom<number>({
  key: "tower/health",
  default: DEFAULT_HEALTH,
});

export const useTowerHealth = () => useRecoilValue(healthState);

export const towerPositionState = atom<Position>({
  key: "towerPosition",
  default: { x: 1, y: 1 },
});

export const useTowerPosition = () => useRecoilValue(towerPositionState);

export const towerSpeedState = atom<number>({
  key: "towerSpeed",
  default: DEFAULT_SPEED,
});

export const useTowerSpeed = () => useRecoilValue(towerSpeedState);

export const regenerationRateState = atom<number>({
  key: "tower/regenerationRate",
  default: 0,
});

export const maxHealthState = atom<number>({
  key: "tower/maxHealth",
  default: DEFAULT_HEALTH,
});
export const useTowerMaxHealth = () => useRecoilValue(maxHealthState);

export const rateOfFireState = atom<number>({
  key: "tower/rateOfFire",
  default: 2,
});

export const targetingRangeState = atom<number>({
  key: "tower/targetingRange",
  default: 200,
});

export const useTargetingRange = () => useRecoilValue(targetingRangeState);

export const useInitializeTower = (sceneElement: HTMLDivElement | null) => {
  const setTowerPosition = useSetRecoilState(towerPositionState);

  useEffect(() => {
    if (sceneElement) {
      const x = sceneElement.clientWidth / 2;
      const y = sceneElement.clientHeight / 2;

      setTowerPosition({ x, y });
    }
  }, [setTowerPosition, sceneElement]);
};
