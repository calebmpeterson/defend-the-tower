import { TOWER_SIZE } from "../../entities/Tower";
import { nextWaypointState, pointerPositionState } from "../../input";
import { towerPositionState, towerSpeedState } from "../../state/tower";
import { distance } from "../../utils/Trigonometry";
import { Updater } from "../types";

export const updateTowerPosition: Updater = ({ get, set }, deltaT) => {
  const pointerPosition = get(pointerPositionState);
  const nextWaypointPosition = get(nextWaypointState);
  // Go towards the next waypoint or the pointer
  const goalPosition = nextWaypointPosition ?? pointerPosition;
  const towerPosition = get(towerPositionState);

  // Don't move if already very close
  if (distance(goalPosition, towerPosition) < TOWER_SIZE) {
    return;
  }

  const dy = towerPosition.y - goalPosition.y;
  const dx = towerPosition.x - goalPosition.x;
  const angle = Math.atan2(dy, dx);

  const towerSpeed = get(towerSpeedState);

  const newPosition = {
    x: towerPosition.x - (towerSpeed * deltaT * Math.cos(angle)) / 1000,
    y: towerPosition.y - (towerSpeed * deltaT * Math.sin(angle)) / 1000,
  };

  set(towerPositionState, newPosition);

  if (distance(newPosition, goalPosition) < TOWER_SIZE) {
    set(nextWaypointState, null);
  }
};
