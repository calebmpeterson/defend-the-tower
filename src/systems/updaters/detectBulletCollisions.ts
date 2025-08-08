import { flatMap, groupBy, map, sum, without } from "lodash";
import { v4 as uuid4 } from "uuid";
import { BULLET_SIZE } from "../../entities/Bullet";
import {
  bulletsState,
  probabilityOfCriticalHitState,
  probabilityOfPenetratingHitState,
} from "../../state/bullets";
import { enemiesState } from "../../state/enemies";
import { explosionsState } from "../../state/explosions";
import { gameState } from "../../state/game";
import { resourcesState, scoreState } from "../../state/score";
import { Explosion } from "../../types";
import { distance } from "../../utils/Trigonometry";
import { Updater } from "../types";
import { elapsedState } from "../update";

export const detectBulletCollisions: Updater = ({ get, set }) => {
  const activeEnemies = get(enemiesState);
  const activeBullets = get(bulletsState);
  const deadBullets = [];
  const enemyHits = [];

  const probabilityOfCriticalHit = get(probabilityOfCriticalHitState);
  const probabilityOfPenetratingHit = get(probabilityOfPenetratingHitState);

  // Check every bullet against every enemy, updating/destroying as appropriate
  for (const enemy of activeEnemies) {
    for (const bullet of activeBullets) {
      if (
        distance(enemy.position, bullet.position) <
        (enemy.size + BULLET_SIZE) / 2
      ) {
        const failedToPenetrate = Math.random() > probabilityOfPenetratingHit;
        if (failedToPenetrate) {
          deadBullets.push(bullet);
        }

        const isCriticalHit = Math.random() < probabilityOfCriticalHit;
        enemyHits.push({
          id: enemy.id,
          damage: isCriticalHit ? enemy.health : bullet.damage,
        });
      }
    }
  }

  const hitsByEnemyId = groupBy(enemyHits, "id");
  const updatedEnemies = activeEnemies.map((enemy) => ({
    ...enemy,
    health: enemy.health - sum(map(hitsByEnemyId[enemy.id], "damage")),
  }));

  const didTriggerUpgrade = updatedEnemies.some(
    (enemy) => enemy.health <= 0 && enemy.isUpgradeTrigger
  );
  if (didTriggerUpgrade) {
    set(gameState, "upgrading");
  }

  set(
    enemiesState,
    updatedEnemies.filter((enemy) => enemy.health > 0)
  );
  set(bulletsState, without(activeBullets, ...deadBullets));

  const destroyedEnemies = updatedEnemies.filter((enemy) => enemy.health <= 0);

  // Create an explosion for each destroyed enemy
  const newExplosions: Explosion[] = [
    // Explosions for destroyed enemies
    ...destroyedEnemies.map((enemy) => ({
      id: uuid4(),
      startTime: get(elapsedState),
      duration: 500,
      position: enemy.position,
      color: enemy.color,
    })),
    // Explosions for damaged enemies
    ...flatMap(updatedEnemies, (enemy) => {
      if (hitsByEnemyId[enemy.id]) {
        return [
          {
            id: uuid4(),
            startTime: get(elapsedState),
            duration: 250,
            position: enemy.position,
            color: enemy.color,
          },
        ];
      }

      return [];
    }),
  ];

  set(explosionsState, (explosions) => [...explosions, ...newExplosions]);

  // Update the score
  const pointsToAdd = sum(destroyedEnemies.map((enemy) => enemy.points));
  set(scoreState, (score) => score + pointsToAdd);
  set(resourcesState, (score) => score + pointsToAdd);
};
