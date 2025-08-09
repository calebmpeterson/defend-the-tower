import { targetingCapabilityState } from "../../state/bullets";
import { enemiesState } from "../../state/enemies";
import { screenState } from "../../state/screen";
import createWaveOfEnemies from "../../utils/createWaveOfEnemies";
import { Updater } from "../types";

export const spawnEnemies: Updater = ({ get, set }) => {
  const maxTargets = get(targetingCapabilityState);
  const enemiesCount = get(enemiesState).length;

  const factor = maxTargets * 20;

  if (enemiesCount < factor) {
    const screen = get(screenState);
    const screenMinimum = Math.min(screen.width, screen.height);

    const position = {
      x: screen.width / 2,
      y: screen.height / 2,
    };

    const distance = screenMinimum * 0.8;
    const newEnemy = createWaveOfEnemies(position, distance, 10 + factor);

    set(enemiesState, (enemies) => [...enemies, ...newEnemy]);
  }
};
