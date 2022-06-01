import { get } from "lodash";
import { InputEvents, InputEvent } from "../systems/types";

export const hasKeyDown = (events: InputEvents, key: string) =>
  events.some(
    (event: InputEvent) =>
      event.name === "onKeyDown" && get(event, "payload.key") === key
  );
