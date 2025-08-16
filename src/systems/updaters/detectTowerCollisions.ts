import { sum } from "lodash";
import { v4 as uuid4 } from "uuid";
import { TOWER_SIZE } from "../../entities/Tower";
import { enemiesState } from "../../state/enemies";
import { explosionsState } from "../../state/explosions";
import { screenShakeState } from "../../state/screen";
import { healthState, towerPositionState } from "../../state/tower";
import { Explosion } from "../../types";
import { distance } from "../../utils/Trigonometry";
import { Updater } from "../types";
import { elapsedState } from "../update";

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

  const newExplosions: Explosion[] = collidedEnemies.map((enemy) => ({
    id: uuid4(),
    startTime: get(elapsedState),
    duration: 250,
    position: enemy.position,
    color: "--player",
  }));

  if (totalDamage > 0) {
    set(screenShakeState, Date.now());
  }

  set(explosionsState, (explosions) => [...explosions, ...newExplosions]);
};
