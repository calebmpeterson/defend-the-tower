import { atom, useRecoilValue } from "recoil";
import { GameState } from "../types";

export const gameState = atom<GameState>({
  key: "game/state",
  default: "running",
});

export const useGameState = () => useRecoilValue(gameState);
