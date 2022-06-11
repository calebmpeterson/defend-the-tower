import {
  atom,
  atomFamily,
  TransactionInterface_UNSTABLE,
  useRecoilValue,
} from "recoil";

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
