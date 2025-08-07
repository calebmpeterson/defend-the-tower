import { Updater } from "../types";
import { elapsedState } from "../update";

export const updateGameTimer: Updater = ({ set }, deltaT) => {
  set(elapsedState, (t) => t + deltaT);
};
