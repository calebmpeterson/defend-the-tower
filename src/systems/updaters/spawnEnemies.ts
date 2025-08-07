import { atom, useRecoilValue } from "recoil";
import { enemiesState, enemySpawnRateState } from "../../state/enemies";
import { screenState } from "../../state/screen";
import createEnemy from "../../utils/createEnemy";
import { Updater } from "../types";

export const elapsedState = atom<number>({
  key: "clock/elapsed",
  default: 0,
});

export const useElapsed = () => useRecoilValue(elapsedState);

export const spawnEnemies: Updater = ({ get, set }) => {
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
