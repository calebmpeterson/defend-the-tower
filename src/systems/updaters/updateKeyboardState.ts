import { get as _get, uniq } from "lodash";
import { activeKeysState, keyState } from "../../input";
import { Updater } from "../types";

export const updateKeyboardState: Updater = ({ set }, _deltaT, { events }) => {
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
