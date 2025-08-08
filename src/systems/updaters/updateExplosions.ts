import { explosionsState } from "../../state/explosions";
import { Updater } from "../types";
import { elapsedState } from "../update";

export const updateExplosions: Updater = ({ get, set }) => {
  // Remove any "expired" explosions
  const elapsed = get(elapsedState);
  set(explosionsState, (explosions) =>
    explosions.filter(
      (explosion) => elapsed - explosion.startTime < explosion.duration
    )
  );
};
