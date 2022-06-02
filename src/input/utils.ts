import { get } from "lodash";
import { InputEvents, InputEvent } from "./types";

export const hasKeyDown = (events: InputEvents, ...keys: string[]) =>
  events.some(
    (event: InputEvent) =>
      event.name === "onKeyDown" && keys.includes(get(event, "payload.key"))
  );
