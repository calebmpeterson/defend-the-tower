import { atom, useRecoilValue } from "recoil";
import { Enemy } from "../types";

export const enemiesState = atom<Enemy[]>({
  key: "enemies",
  default: [],
});

export const useEnemies = () => useRecoilValue(enemiesState);
