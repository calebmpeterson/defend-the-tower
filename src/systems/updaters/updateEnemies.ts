import { enemiesState } from "../../state/enemies";
import { towerPositionState } from "../../state/tower";
import { Updater } from "../types";

export const updateEnemies: Updater = ({ get, set }, deltaT) => {
  const towerPosition = get(towerPositionState);

  const enemies = get(enemiesState);

  // Update all enemies
  const updatedEnemies = enemies.map((enemy) => {
    const dy = towerPosition.y - enemy.position.y;
    const dx = towerPosition.x - enemy.position.x;
    const angle = Math.atan2(dy, dx);

    return {
      ...enemy,
      position: {
        x: enemy.position.x + (enemy.speed * deltaT * Math.cos(angle)) / 1000,
        y: enemy.position.y + (enemy.speed * deltaT * Math.sin(angle)) / 1000,
      },
    };
  });
  set(enemiesState, updatedEnemies);
};
