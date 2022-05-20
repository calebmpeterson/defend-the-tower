import { atom, selector, useRecoilValue } from "recoil";
import { Bullet } from "../types";

export const bulletsState = atom<Bullet[]>({
  key: "bullets",
  default: [],
});

export const useBullets = () => useRecoilValue(bulletsState);

export const timeOfLastShotState = atom<number>({
  key: "bullets/timeOfLastShot",
  default: 0,
});

export const bulletsCountState = selector<number>({
  key: "bullets/count",
  get: ({ get }) => get(bulletsState).length,
});

export const useBulletsCount = () => useRecoilValue(bulletsCountState);

export const bulletDamageState = atom<number>({
  key: "bullets/damage",
  default: 10,
});
