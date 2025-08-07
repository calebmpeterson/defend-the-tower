import { sum } from "lodash";
import { TOWER_SIZE } from "../../entities/Tower";
import { enemiesState } from "../../state/enemies";
import { healthState, towerPositionState } from "../../state/tower";
import { distance } from "../../utils/Trigonometry";
import { Updater } from "../types";

export const detectTowerCollisions: Updater = ({ get, set }) => {
  const towerPosition = get(towerPositionState);

  const approachingEnemies = get(enemiesState).filter(
    (enemy) => distance(towerPosition, enemy.position) > TOWER_SIZE / 2
  );

  const collidedEnemies = get(enemiesState).filter(
    (enemy) => distance(towerPosition, enemy.position) <= TOWER_SIZE / 2
  );

  set(enemiesState, approachingEnemies);

  const totalDamage = sum(collidedEnemies.map((enemy) => enemy.health));
  set(healthState, (h) => Math.max((h -= totalDamage), 0));
};
