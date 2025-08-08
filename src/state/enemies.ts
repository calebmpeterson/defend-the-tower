import { atom, useRecoilValue } from "recoil";
import { Enemy } from "../types";

export const enemiesState = atom<Enemy[]>({
  key: "enemies",
  default: [],
});

export const useEnemies = () => useRecoilValue(enemiesState);

export const useEnemiesCount = () => useRecoilValue(enemiesState).length;

export const enemySpawnRateState = atom<number>({
  key: "enemies/spawnRate",
  default: 0.2,
});
