import { first, groupBy, map, size, sortBy, sum, without } from "lodash";
import { atom, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { BULLET_SIZE, BULLET_SPEED } from "../entities/Bullet";
import { TOWER_SIZE } from "../entities/Tower";
import type { Enemy as EnemyType } from "../types";
import createEnemy from "../utils/createEnemy";
import { distance } from "../utils/Trigonometry";
import {
  bulletsState,
  timeOfLastShotState,
  bulletDamageState,
} from "./bullets";
import { enemiesState, enemySpawnRateState } from "./enemies";
import { gameState } from "./game";
import { scoreState } from "./score";
import { screenState } from "./screen";
import { healthState, rateOfFireState, regenerationRateState } from "./tower";

const elapsedState = atom<number>({
  key: "clock/elapsed",
  default: 0,
});

export const useElapsed = () => useRecoilValue(elapsedState);

export const useUpdate = () =>
  useRecoilTransaction_UNSTABLE(
    ({ get, set }) =>
      (deltaT: number) => {
        if (get(gameState) === "defeat") {
          return;
        }

        const screen = get(screenState);
        const screenMinimum = Math.min(screen.width, screen.height);

        const towerPosition = {
          x: screen.width / 2,
          y: screen.height / 2,
        };

        set(elapsedState, (t) => t + deltaT);

        const enemies = get(enemiesState);

        // Update all enemies
        const updatedEnemies = enemies.map((enemy) => {
          const dy = screen.height / 2 - enemy.position.y;
          const dx = screen.width / 2 - enemy.position.x;
          const angle = Math.atan2(dy, dx);

          return {
            ...enemy,
            position: {
              x:
                enemy.position.x +
                (enemy.speed * deltaT * Math.cos(angle)) / 1000,
              y:
                enemy.position.y +
                (enemy.speed * deltaT * Math.sin(angle)) / 1000,
            },
          };
        });

        const approachingEnemies = updatedEnemies.filter(
          (enemy) => distance(towerPosition, enemy.position) > TOWER_SIZE / 2
        );

        const collidedEnemies = updatedEnemies.filter(
          (enemy) => distance(towerPosition, enemy.position) <= TOWER_SIZE / 2
        );

        // The closest enemy is the target
        const closestEnemy = first(
          sortBy(approachingEnemies, (enemy) =>
            distance(towerPosition, enemy.position)
          )
        );

        const shotDelay = 500 / get(rateOfFireState);
        const canShoot =
          get(elapsedState) - get(timeOfLastShotState) > shotDelay;

        // Shoot at the closest enemy (if there is one)
        if (closestEnemy && canShoot) {
          const dx = closestEnemy.position.x - towerPosition.x;
          const dy = closestEnemy.position.y - towerPosition.y;
          const angle = Math.atan2(dy, dx);

          set(bulletsState, (bullets) => [
            ...bullets,
            {
              id: `bullet-${Date.now()}`,
              angle,
              position: towerPosition,
              damage: get(bulletDamageState),
            },
          ]);

          set(timeOfLastShotState, get(elapsedState));
        }

        // Maybe spawn a new enemy
        if (
          Math.random() <
          (get(enemySpawnRateState) + get(elapsedState) / 100000) / 100
        ) {
          const distance = screenMinimum * 0.8;
          const newEnemy = createEnemy(towerPosition, distance);

          set(enemiesState, [...approachingEnemies, newEnemy]);
        } else {
          set(enemiesState, approachingEnemies);
        }

        // Update all the bullets
        const bullets = get(bulletsState);

        const updatedBullets = bullets.map((bullet) => {
          const dx = (Math.cos(bullet.angle) * BULLET_SPEED * deltaT) / 1000;
          const dy = (Math.sin(bullet.angle) * BULLET_SPEED * deltaT) / 1000;

          return {
            ...bullet,
            position: {
              x: bullet.position.x + dx,
              y: bullet.position.y + dy,
            },
          };
        });

        // Remove all bullets outside of the game scene
        const onScreenBullets = updatedBullets.filter(
          (bullet) =>
            bullet.position.x >= 0 &&
            bullet.position.x <= screen.width &&
            bullet.position.y >= 0 &&
            bullet.position.y <= screen.height
        );

        set(bulletsState, onScreenBullets);

        // Collision detect bullets and enemies
        {
          const activeEnemies = get(enemiesState);
          const activeBullets = get(bulletsState);
          const deadBullets = [];
          const enemyHits = [];

          // TODO: check every bullet against every enemy, updating/destroying as appropriate
          for (const enemy of activeEnemies) {
            for (const bullet of activeBullets) {
              if (
                distance(enemy.position, bullet.position) <
                (enemy.size + BULLET_SIZE) / 2
              ) {
                deadBullets.push(bullet);
                enemyHits.push({
                  id: enemy.id,
                  damage: bullet.damage,
                });
              }
            }
          }

          const hitsByEnemyId = groupBy(enemyHits, "id");
          const updatedEnemies = activeEnemies.map((enemy) => ({
            ...enemy,
            health: enemy.health - sum(map(hitsByEnemyId[enemy.id], "damage")),
          }));

          set(
            enemiesState,
            updatedEnemies.filter((enemy) => enemy.health > 0)
          );
          set(bulletsState, without(activeBullets, ...deadBullets));

          // Update the score
          const destroyedEnemies = updatedEnemies.filter(
            (enemy) => enemy.health <= 0
          );
          const pointsToAdd = sum(
            destroyedEnemies.map((enemy) => enemy.points)
          );
          set(scoreState, (score) => score + pointsToAdd);
        }

        // Update the tower's health
        const regenerationRate = get(regenerationRateState);
        set(healthState, (h) => h + (regenerationRate * deltaT) / 1000);

        const totalDamage = sum(collidedEnemies.map((enemy) => enemy.health));
        set(healthState, (h) => Math.max((h -= totalDamage), 0));

        // Update the game state
        set(gameState, get(healthState) > 0 ? "running" : "defeat");
      },
    []
  );
