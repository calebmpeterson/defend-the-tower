import { groupBy, isEmpty, map, sortBy, sum, take, without } from "lodash";
import {
  atom,
  TransactionInterface_UNSTABLE,
  useRecoilTransaction_UNSTABLE,
  useRecoilValue,
} from "recoil";
import { v4 as uuid4 } from "uuid";
import { BULLET_SIZE, BULLET_SPEED } from "../entities/Bullet";
import { TOWER_SIZE } from "../entities/Tower";
import { Explosion } from "../types";
import createEnemy from "../utils/createEnemy";
import { distance } from "../utils/Trigonometry";
import {
  bulletsState,
  timeOfLastShotState,
  bulletDamageState,
  targetingCapabilityState,
} from "./bullets";
import { enemiesState, enemySpawnRateState } from "./enemies";
import { explosionsState } from "./explosions";
import { gameState } from "./game";
import { resourcesState, scoreState } from "./score";
import { screenState } from "./screen";
import {
  healthState,
  maxHealthState,
  rateOfFireState,
  regenerationRateState,
  targetingRangeState,
} from "./tower";

const elapsedState = atom<number>({
  key: "clock/elapsed",
  default: 0,
});

export const useElapsed = () => useRecoilValue(elapsedState);

type Updater = (
  transaction: Pick<TransactionInterface_UNSTABLE, "get" | "set">,
  deltaT: number
) => void;

const spawnEnemy: Updater = ({ get, set }, deltaT) => {
  if (
    Math.random() <
    (get(enemySpawnRateState) + get(elapsedState) / 100000) / 100
  ) {
    const screen = get(screenState);
    const screenMinimum = Math.min(screen.width, screen.height);

    const towerPosition = {
      x: screen.width / 2,
      y: screen.height / 2,
    };

    const distance = screenMinimum * 0.8;
    const newEnemy = createEnemy(towerPosition, distance);

    set(enemiesState, (enemies) => [...enemies, newEnemy]);
  }
};

const shootBullets: Updater = ({ get, set }, deltaT) => {
  const screen = get(screenState);

  const towerPosition = {
    x: screen.width / 2,
    y: screen.height / 2,
  };

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

const updateBullets: Updater = ({ get, set }, deltaT) => {
  const screen = get(screenState);
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
};

const detectCollisions: Updater = ({ get, set }) => {
  const activeEnemies = get(enemiesState);
  const activeBullets = get(bulletsState);
  const deadBullets = [];
  const enemyHits = [];

  // Check every bullet against every enemy, updating/destroying as appropriate
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

  const destroyedEnemies = updatedEnemies.filter((enemy) => enemy.health <= 0);

  // Create an explosion for each destroyed enemy
  const newExplosions: Explosion[] = destroyedEnemies.map((enemy) => ({
    id: uuid4(),
    startTime: get(elapsedState),
    duration: 500,
    position: enemy.position,
    color: enemy.color,
  }));
  set(explosionsState, (explosions) => [...explosions, ...newExplosions]);

  // Remove any "expired" explosions
  const elapsed = get(elapsedState);
  set(explosionsState, (explosions) =>
    explosions.filter(
      (explosion) => elapsed - explosion.startTime < explosion.duration
    )
  );

  // Update the score
  const pointsToAdd = sum(destroyedEnemies.map((enemy) => enemy.points));
  set(scoreState, (score) => score + pointsToAdd);
  set(resourcesState, (score) => score + pointsToAdd);
};

const regenerateTowerHealth: Updater = ({ get, set }, deltaT) => {
  const regenerationRate = get(regenerationRateState);
  set(healthState, (h) =>
    Math.min(get(maxHealthState), h + (regenerationRate * deltaT) / 1000)
  );
};

const updateGameState: Updater = ({ get, set }) => {
  set(gameState, get(healthState) > 0 ? "running" : "defeat");
};

export const useUpdate = () =>
  useRecoilTransaction_UNSTABLE(
    ({ get, set }) =>
      (deltaT: number) => {
        if (get(gameState) === "defeat") {
          return;
        }

        const screen = get(screenState);

        const towerPosition = {
          x: screen.width / 2,
          y: screen.height / 2,
        };

        set(elapsedState, (t) => t + deltaT);

        // Update the tower's health
        regenerateTowerHealth({ get, set }, deltaT);

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
        set(enemiesState, approachingEnemies);

        const collidedEnemies = updatedEnemies.filter(
          (enemy) => distance(towerPosition, enemy.position) <= TOWER_SIZE / 2
        );

        const totalDamage = sum(collidedEnemies.map((enemy) => enemy.health));
        set(healthState, (h) => Math.max((h -= totalDamage), 0));

        // Maybe spawn a new enemy
        spawnEnemy({ get, set }, deltaT);

        // Maybe shoot at the enemy
        shootBullets({ get, set }, deltaT);

        // Update all the bullets
        updateBullets({ get, set }, deltaT);

        // Collision detect bullets and enemies
        detectCollisions({ get, set }, deltaT);

        // Update the game state
        updateGameState({ get, set }, deltaT);
      },
    []
  );
