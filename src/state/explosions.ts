import { atom, useRecoilValue } from "recoil";
import { Explosion } from "../types";

export const explosionsState = atom<Explosion[]>({
  key: "effects/explosions",
  default: [],
});

export const useExplosions = () => useRecoilValue(explosionsState);

export const useExplosionsCount = () => useRecoilValue(explosionsState).length;
