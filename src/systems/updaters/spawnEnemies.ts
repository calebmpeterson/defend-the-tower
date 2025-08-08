import { targetingCapabilityState } from "../../state/bullets";
import { enemiesState } from "../../state/enemies";
import { screenState } from "../../state/screen";
import createEnemies from "../../utils/createEnemies";
import { Updater } from "../types";

export const spawnEnemies: Updater = ({ get, set }) => {
  const maxTargets = get(targetingCapabilityState);
  const enemiesCount = get(enemiesState).length;

  if (enemiesCount < maxTargets * 10) {
    const screen = get(screenState);
    const screenMinimum = Math.min(screen.width, screen.height);

    const position = {
      x: screen.width / 2,
      y: screen.height / 2,
    };

    const distance = screenMinimum * 0.8;
    const newEnemy = createEnemies(position, distance, 10 + maxTargets * 10);

    set(enemiesState, (enemies) => [...enemies, ...newEnemy]);
  }
};
