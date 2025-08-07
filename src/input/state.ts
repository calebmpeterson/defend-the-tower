import {
  atom,
  atomFamily,
  TransactionInterface_UNSTABLE,
  useRecoilValue,
} from "recoil";
import { Position } from "../types";

export type KeyState = "up" | "down";

export const keyState = atomFamily<KeyState, string>({
  key: "input/key",
  default: "up",
});

export const activeKeysState = atom<string[]>({
  key: "input/activeKeys",
  default: [],
});

export const useActiveKeys = () => useRecoilValue(activeKeysState);

export const isKeyActive = (
  get: TransactionInterface_UNSTABLE["get"],
  ...keys: string[]
) => keys.some((key) => get(activeKeysState).includes(key));

export const pointerPositionState = atom<Position>({
  key: "input/pointer",
  default: { x: 0, y: 0 },
});

export const usePointerPosition = () => useRecoilValue(pointerPositionState);

export const nextWaypointState = atom<Position | null>({
  key: "input/nextWaypoint",
  default: null,
});
