import { atom, atomFamily, useRecoilCallback, useRecoilValue } from "recoil";

export const scoreState = atom<number>({
  key: "score",
  default: 0,
});

export const useScore = () => useRecoilValue(scoreState);

export const useCanAffordUpgrade = (cost: number) =>
  useRecoilValue(scoreState) > cost;

export const usePayForUpgrade = () =>
  useRecoilCallback(
    ({ set }) =>
      (cost: number) => {
        set(scoreState, (score) => score - cost);
      },
    []
  );

export const upgradeState = atomFamily<number, string>({
  key: "upgrade/level",
  default: 1,
});
