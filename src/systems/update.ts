import {
  get as _get,
  groupBy,
  isEmpty,
  map,
  sortBy,
  sum,
  take,
  uniq,
  without,
} from "lodash";
import { atom, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { v4 as uuid4 } from "uuid";
import { UpdateFn } from "../engine";
import { BULLET_SIZE, BULLET_SPEED } from "../entities/Bullet";
import { TOWER_SIZE } from "../entities/Tower";
import {
  activeKeysState,
  hasKeyDown,
  keyState,
  pointerPositionState,
} from "../input";
import {
  bulletDamageState,
  bulletsState,
  targetingCapabilityState,
  timeOfLastShotState,
} from "../state/bullets";
import { enemiesState, enemySpawnRateState } from "../state/enemies";
import { explosionsState } from "../state/explosions";
import { gameState } from "../state/game";
import { resourcesState, scoreState } from "../state/score";
import { screenState } from "../state/screen";
import {
  healthState,
  maxHealthState,
  rateOfFireState,
  regenerationRateState,
  targetingRangeState,
  towerPositionState,
  towerSpeedState,
} from "../state/tower";
import { Explosion } from "../types";
import createEnemy from "../utils/createEnemy";
import { distance } from "../utils/Trigonometry";
import { Updater } from "./types";

const elapsedState = atom<number>({
  key: "clock/elapsed",
  default: 0,
});

export const useElapsed = () => useRecoilValue(elapsedState);

const updateGameTimer: Updater = ({ set }, deltaT) => {
  set(elapsedState, (t) => t + deltaT);
};

const updateEnemies: Updater = ({ get, set }, deltaT) => {
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

const spawnEnemy: Updater = ({ get, set }) => {
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

const shootBullets: Updater = ({ get, set }) => {
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

const detectTowerCollisions: Updater = ({ get, set }) => {
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

const detectBulletCollisions: Updater = ({ get, set }) => {
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

const updateKeyboardState: Updater = ({ set }, _deltaT, { events }) => {
  events.forEach((event) => {
    const key = _get(event, "payload.key");

    if (event.name === "onKeyDown") {
      set(keyState(key), "down");
      set(activeKeysState, (downs) => uniq([...downs, key]));
    } else if (event.name === "onKeyUp") {
      set(keyState(key), "up");
      set(activeKeysState, (downs) => downs.filter((k) => k !== key));
    }
  });
};

const updatePointerState: Updater = ({ set }, _deltaT, { events }) => {
  events.forEach((event) => {
    if (
      event.name === "onPointerMove" &&
      "clientX" in event.payload &&
      "clientY" in event.payload
    ) {
      set(pointerPositionState, {
        // @ts-ignore-error
        x: event.payload.clientX as number,
        // @ts-ignore-error
        y: event.payload.clientY as number,
      });
    }
  });
};

const updateTowerPosition: Updater = ({ get, set }, deltaT) => {
  const pointerPosition = get(pointerPositionState);
  const towerPosition = get(towerPositionState);

  // Don't move if already very close
  if (distance(pointerPosition, towerPosition) < TOWER_SIZE) {
    return;
  }

  const dy = towerPosition.y - pointerPosition.y;
  const dx = towerPosition.x - pointerPosition.x;
  const angle = Math.atan2(dy, dx);

  const towerSpeed = get(towerSpeedState);

  const newPosition = {
    x: towerPosition.x - (towerSpeed * deltaT * Math.cos(angle)) / 1000,
    y: towerPosition.y - (towerSpeed * deltaT * Math.sin(angle)) / 1000,
  };

  set(towerPositionState, newPosition);
};

export const useUpdate = (): UpdateFn =>
  useRecoilTransaction_UNSTABLE(
    ({ get, set }) =>
      (deltaT: number, update) => {
        updateKeyboardState({ get, set }, deltaT, update);
        updatePointerState({ get, set }, deltaT, update);

        if (get(gameState) === "defeat") {
          return;
        }

        if (hasKeyDown(update.events, "Escape")) {
          set(gameState, (s) => (s === "running" ? "paused" : "running"));
        }

        if (get(gameState) === "paused") {
          return;
        }

        updateGameTimer({ get, set }, deltaT, update);

        updateTowerPosition({ get, set }, deltaT, update);
        regenerateTowerHealth({ get, set }, deltaT, update);

        updateEnemies({ get, set }, deltaT, update);

        detectTowerCollisions({ get, set }, deltaT, update);

        spawnEnemy({ get, set }, deltaT, update);

        shootBullets({ get, set }, deltaT, update);

        updateBullets({ get, set }, deltaT, update);

        detectBulletCollisions({ get, set }, deltaT, update);

        updateGameState({ get, set }, deltaT, update);
      },
    []
  );
