import { atom, useRecoilValue } from "recoil";

export const scoreState = atom<number>({
  key: "score",
  default: 0,
});

export const useScore = () => useRecoilValue(scoreState);
