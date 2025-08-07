import { gameState } from "../../state/game";
import { healthState } from "../../state/tower";
import { Updater } from "../types";

export const updateGameState: Updater = ({ get, set }) => {
  set(gameState, get(healthState) > 0 ? get(gameState) : "defeat");
};
