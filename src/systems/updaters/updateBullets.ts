import { BULLET_SPEED } from "../../entities/Bullet";
import { bulletsState } from "../../state/bullets";
import { screenState } from "../../state/screen";
import { Updater } from "../types";

export const updateBullets: Updater = ({ get, set }, deltaT) => {
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
