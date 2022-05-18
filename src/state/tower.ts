import { atom, useRecoilValue } from "recoil";

export const healthState = atom<number>({
  key: "tower/health",
  default: 100,
});

export const useTowerHealth = () => useRecoilValue(healthState);

export const rateOfFireState = atom<number>({
  key: "tower/rateOfFire",
  default: 500,
});
