import { isEmpty, sortBy, take } from "lodash";
import { v4 as uuid4 } from "uuid";
import {
  bulletDamageState,
  bulletsState,
  targetingCapabilityState,
  timeOfLastShotState,
} from "../../state/bullets";
import { enemiesState } from "../../state/enemies";
import {
  rateOfFireState,
  targetingRangeState,
  towerPositionState,
} from "../../state/tower";
import { distance } from "../../utils/Trigonometry";
import { Updater } from "../types";
import { elapsedState } from "../update";

export const shootBullets: Updater = ({ get, set }) => {
  const towerPosition = get(towerPositionState);

  // The closer enemies are the target(s)
  const targetingCapacity = get(targetingCapabilityState);
  const targetingRange = get(targetingRangeState);
  const targets = take(
    sortBy(
      get(enemiesState).filter(
        (enemy) => distance(towerPosition, enemy.position) <= targetingRange
      ),
      (enemy) => distance(towerPosition, enemy.position)
    ),
    targetingCapacity
  );

  const shotDelay = 500 / get(rateOfFireState);
  const timeSinceLastShot = get(elapsedState) - get(timeOfLastShotState);
  const canShoot = timeSinceLastShot > shotDelay;

  const damage = get(bulletDamageState);

  // If there are target(s) and the tower can shoot
  if (!isEmpty(targets) && canShoot) {
    const newBullets = targets.map((closestEnemy) => {
      const dx = closestEnemy.position.x - towerPosition.x;
      const dy = closestEnemy.position.y - towerPosition.y;
      const angle = Math.atan2(dy, dx);

      return {
        id: `bullet-${uuid4()}`,
        angle,
        position: towerPosition,
        damage,
      };
    });

    set(bulletsState, (bullets) => [...bullets, ...newBullets]);

    set(timeOfLastShotState, get(elapsedState));
  }
};
