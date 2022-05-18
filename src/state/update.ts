import { first, sortBy, sum } from "lodash";
import { atom, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { BULLET_SPEED } from "../entities/Bullet";
import { TOWER_SIZE } from "../entities/Tower";
import type { Enemy as EnemyType } from "../types";
import { distance } from "../utils/Trigonometry";
import { bulletsState, timeOfLastShotState } from "./bullets";
import { enemiesState } from "./enemies";
import { gameState } from "./game";
import { screenState } from "./screen";
import { healthState, rateOfFireState } from "./tower";

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

        const canShoot =
          get(elapsedState) - get(timeOfLastShotState) > get(rateOfFireState);

        // Shoot at the closest enemy (if there is one)
        if (closestEnemy && canShoot) {
          const dx = closestEnemy.position.x - towerPosition.x;
          const dy = closestEnemy.position.y - towerPosition.y;
          const angle = Math.atan2(dy, dx);

          set(bulletsState, (bullets) => [
            ...bullets,
            { id: `bullet-${Date.now()}`, angle, position: towerPosition },
          ]);

          set(timeOfLastShotState, get(elapsedState));
        }

        // Maybe spawn a new enemy
        if (Math.random() > 0.99) {
          const angle = Math.random() * 2 * Math.PI;
          const distance = screenMinimum * 0.8;
          const x = towerPosition.x + Math.cos(angle) * distance;
          const y = towerPosition.y + Math.sin(angle) * distance;
          const size = 10;
          const newEnemy: EnemyType = {
            id: `enemy-${Date.now()}`,
            size,
            health: 20,
            speed: 100,
            color: "#f00",
            position: {
              x,
              y,
            },
          };

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
        const aliveBullets = updatedBullets.filter(
          (bullet) =>
            bullet.position.x >= 0 &&
            bullet.position.x <= screen.width &&
            bullet.position.y >= 0 &&
            bullet.position.y <= screen.height
        );

        set(bulletsState, aliveBullets);

        // Update the player's health
        const totalDamage = sum(collidedEnemies.map((enemy) => enemy.health));
        set(healthState, (h) => (h -= totalDamage));

        // Update the game state
        set(gameState, get(healthState) > 0 ? "running" : "defeat");
      },
    []
  );
