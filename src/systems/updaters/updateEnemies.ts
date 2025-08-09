import { enemiesState } from "../../state/enemies";
import { towerPositionState } from "../../state/tower";
import { Velocity } from "../../types";
import { angleBetween } from "../../utils/angleBetween";
import { distance } from "../../utils/Trigonometry";
import { applyVelocities, V0 } from "../../utils/Vector";
import { velocityFromAngle } from "../../utils/velocityFromAngle";
import { Updater } from "../types";

export const updateEnemies: Updater = ({ get, set }, deltaT) => {
  const towerPosition = get(towerPositionState);

  const enemies = get(enemiesState);

  // Update all enemies
  const updatedEnemies = enemies.map((self) => {
    const angleToPlayer = angleBetween(towerPosition, self.position);
    const velocityTowardsPlayer = velocityFromAngle(
      angleToPlayer,
      self.speed,
      deltaT
    );

    const velocitiesAwayFromOthers: Velocity[] = enemies.map((other) => {
      if (other.id === self.id) {
        return V0;
      }

      // Add a little organic wobble
      const wobble = Math.random();

      if (
        distance(self.position, other.position) >
        (self.size + other.size + wobble) / 2
      ) {
        return V0;
      }

      const angleToOther = angleBetween(self.position, other.position);
      const velocityAwayFromOther = velocityFromAngle(
        angleToOther,
        self.speed,
        deltaT
      );

      return velocityAwayFromOther;
    });

    return {
      ...self,
      position: applyVelocities(self.position, [
        velocityTowardsPlayer,
        ...velocitiesAwayFromOthers,
      ]),
    };
  });

  set(enemiesState, updatedEnemies);
};
