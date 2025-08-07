import {
  healthState,
  maxHealthState,
  regenerationRateState,
} from "../../state/tower";
import { Updater } from "../types";

export const regenerateTowerHealth: Updater = ({ get, set }, deltaT) => {
  const regenerationRate = get(regenerationRateState);
  set(healthState, (h) =>
    Math.min(get(maxHealthState), h + (regenerationRate * deltaT) / 1000)
  );
};
