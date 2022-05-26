import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";

export const scoreState = atom<number>({
  key: "score",
  default: 0,
});

export const resourcesState = atom<number>({
  key: "resources",
  default: 0,
});

export const useScore = () => useRecoilValue(scoreState);
export const useResources = () => useRecoilValue(resourcesState);

const canAffordUpgradeState = selectorFamily<boolean, number>({
  key: "canAffordUpgrade",
  get:
    (cost) =>
    ({ get }) =>
      get(resourcesState) > cost,
});

export const useCanAffordUpgrade = (cost: number) =>
  useRecoilValue(canAffordUpgradeState(cost));

export const usePayForUpgrade = () =>
  useRecoilCallback(
    ({ set }) =>
      (cost: number) => {
        set(resourcesState, (available) => available - cost);
      },
    []
  );

export const upgradeState = atomFamily<number, string>({
  key: "upgrade/level",
  default: 1,
});
