import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { GameState } from "../types";
import { useWindowBlur } from "../utils/useWindowBlur";

export const gameState = atom<GameState>({
  key: "game/state",
  default: "running",
});

export const useGameState = () => useRecoilValue(gameState);

export const usePauseOnBlur = () => {
  const setGameState = useSetRecoilState(gameState);
  const onBlur = useCallback(() => {
    setGameState("paused");
  }, [setGameState]);

  useWindowBlur(onBlur);
};
