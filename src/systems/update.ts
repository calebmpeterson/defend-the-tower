import { atom, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { UpdateFn } from "../engine";
import { hasKeyDown } from "../input";
import { gameState } from "../state/game";
import { detectBulletCollisions } from "./updaters/detectBulletCollisions";
import { detectTowerCollisions } from "./updaters/detectTowerCollisions";
import { regenerateTowerHealth } from "./updaters/regenerateTowerHealth";
import { shootBullets } from "./updaters/shootBullets";
import { spawnEnemies } from "./updaters/spawnEnemies";
import { updateBullets } from "./updaters/updateBullets";
import { updateEnemies } from "./updaters/updateEnemies";
import { updateGameState } from "./updaters/updateGameState";
import { updateGameTimer } from "./updaters/updateGameTimer";
import { updateKeyboardState } from "./updaters/updateKeyboardState";
import { updatePointerState } from "./updaters/updatePointerState";
import { updateTowerPosition } from "./updaters/updateTowerPosition";

export const elapsedState = atom<number>({
  key: "clock/elapsed",
  default: 0,
});

export const useElapsed = () => useRecoilValue(elapsedState);

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

        if (get(gameState) === "upgrading") {
          console.log("upgrading");
          return;
        }

        updateGameTimer({ get, set }, deltaT, update);

        updateTowerPosition({ get, set }, deltaT, update);
        regenerateTowerHealth({ get, set }, deltaT, update);

        updateEnemies({ get, set }, deltaT, update);

        detectTowerCollisions({ get, set }, deltaT, update);

        spawnEnemies({ get, set }, deltaT, update);

        shootBullets({ get, set }, deltaT, update);

        updateBullets({ get, set }, deltaT, update);

        detectBulletCollisions({ get, set }, deltaT, update);

        updateGameState({ get, set }, deltaT, update);
      },
    []
  );
