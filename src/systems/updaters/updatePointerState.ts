import { nextWaypointState, pointerPositionState } from "../../input";
import { gameState } from "../../state/game";
import { Updater } from "../types";

export const updatePointerState: Updater = (
  { get, set },
  _deltaT,
  { events }
) => {
  events.forEach((event) => {
    if (get(gameState) !== "running") {
      return;
    }

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

    if (
      event.name === "onPointerDown" &&
      "clientX" in event.payload &&
      "clientY" in event.payload
    ) {
      set(nextWaypointState, {
        // @ts-ignore-error
        x: event.payload.clientX as number,
        // @ts-ignore-error
        y: event.payload.clientY as number,
      });
    }
  });
};
