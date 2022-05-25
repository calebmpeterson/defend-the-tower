import { RecoilState, RecoilValue, useRecoilCallback } from "recoil";
import { gameState } from "./game";
import { screenState } from "./screen";

// Recoil state containers that won't be reset
const statesToRetain = new Set<RecoilValue<unknown> | RecoilState<unknown>>([
  screenState,
]);

export const useReset = () =>
  useRecoilCallback(({ snapshot, reset, refresh }) => () => {
    reset(gameState);

    Array.from(snapshot.getNodes_UNSTABLE()).forEach((node) => {
      const shouldReset = !statesToRetain.has(node);
      if (shouldReset) {
        const info = snapshot.getInfo_UNSTABLE(node);
        if (info.type === "atom") {
          reset(node as RecoilState<unknown>);
        } else {
          refresh(node);
        }
      }
    });
  });
