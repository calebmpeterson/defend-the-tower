import { InputEvents } from "../input";

export type Update = {
  events: InputEvents;
};
export type UpdateFn = (deltaT: number, update: Update) => void;
